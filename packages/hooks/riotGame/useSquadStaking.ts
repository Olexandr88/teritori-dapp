import { isDeliverTxFailure } from "@cosmjs/stargate";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

import {
  TeritoriSquadStakingClient,
  TeritoriSquadStakingQueryClient,
} from "../../contracts-clients/teritori-squad-staking/TeritoriSquadStaking.client";
import {
  SQUAD_STAKE_COEF,
  THE_RIOT_SQUAD_STAKING_CONTRACT_ADDRESS,
} from "../../screens/RiotGame/settings";
import { defaultExecuteFee } from "../../utils/fee";
import {
  buildApproveNFTMsg,
  buildStakingMsg,
  getRipperTraitValue,
  StakingState,
} from "../../utils/game";
import { getSigningCosmWasmClient } from "../../utils/keplr";
import { defaultMemo } from "../../utils/memo";
import { useContractClients } from "../useContractClients";
import useSelectedWallet from "../useSelectedWallet";
import {
  GetSquadResponse,
  GetConfigResponse,
  GetLastStakeTimeResponse,
} from "./../../contracts-clients/teritori-squad-staking/TeritoriSquadStaking.types";

export const useSquadStaking = () => {
  const [squadStakingConfig, setSquadStakingConfig] =
    useState<GetConfigResponse>();
  const [currentSquad, setCurrentSquad] = useState<GetSquadResponse>();
  const [remainingPercentage, setRemainingPercentage] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [stakingState, setStakingState] = useState<StakingState>(
    StakingState.UNKNOWN
  );
  const [lastStakeTime, setLastStakeTime] = useState<moment.Moment>();

  const [isLastStakeTimeLoaded, setIsLastStakeTimeLoaded] =
    useState<boolean>(false);
  const [isSquadLoaded, setIsSquadLoaded] = useState<boolean>(false);
  const [isStakingStateLoaded, setIsStakingStateLoaded] =
    useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timer>();

  const selectedWallet = useSelectedWallet();

  const { client, queryClient } = useContractClients(
    THE_RIOT_SQUAD_STAKING_CONTRACT_ADDRESS,
    "teritori-squad-staking"
  );

  const squadStakingClient = client as TeritoriSquadStakingClient;
  const squadStakingQueryClient =
    queryClient as TeritoriSquadStakingQueryClient;

  const squadStake = async (
    selectedRippers: NSRiotGame.RipperDetail[],
    squadStakingConfig: GetConfigResponse
  ) => {
    const tokenIds = selectedRippers.map((r) => r.tokenId);

    const client = await getSigningCosmWasmClient();
    const sender = selectedWallet?.address || "";

    const approveMsgs = tokenIds.map((tokenId) =>
      buildApproveNFTMsg(
        sender,
        THE_RIOT_SQUAD_STAKING_CONTRACT_ADDRESS,
        tokenId,
        squadStakingConfig.nft_contract
      )
    );

    const stakeMsg = buildStakingMsg(sender, tokenIds);
    const msgs = [...approveMsgs, stakeMsg];

    const tx = await client.signAndBroadcast(sender, msgs, "auto", defaultMemo);

    if (isDeliverTxFailure(tx)) {
      throw Error(tx.transactionHash);
    }

    return tx;
  };

  const _fetchSquadStakingConfig = async (
    squadStakingQueryClient: TeritoriSquadStakingQueryClient
  ) => {
    const config: GetConfigResponse = await squadStakingQueryClient.getConfig();
    setSquadStakingConfig(config);
  };

  const _fetchSquadStaking = async (
    user: string,
    squadStakingQueryClient: TeritoriSquadStakingQueryClient
  ) => {
    try {
      const squad: GetSquadResponse = await squadStakingQueryClient.getSquad({
        owner: user,
      });
      setCurrentSquad(squad);
    } catch (e: any) {
      if (e.message?.includes("Squad not found")) {
        console.log("Squad not found:", e.message);
      } else {
        throw e;
      }
    } finally {
      setIsSquadLoaded(true);
    }
  };

  const squadWithdraw = async (
    squadStakingClient: TeritoriSquadStakingClient
  ) => {
    return await squadStakingClient.withdraw(defaultExecuteFee, defaultMemo);
  };

  const estimateStakingDuration = (
    rippers: NSRiotGame.RipperDetail[],
    squadStakingConfig: GetConfigResponse
  ) => {
    const bonusMultiplier = squadStakingConfig.bonus_multiplier;

    let duration = 0;

    const ripperCount = rippers.length;
    if (ripperCount > 0) {
      // Get base stamina from Squad leader at slot 0
      const baseStamina = getRipperTraitValue(rippers[0], "Stamina");
      duration =
        baseStamina *
        SQUAD_STAKE_COEF *
        (bonusMultiplier[ripperCount - 1] / 100);
    }

    return duration * 60 * 60 * 1000; // Convert to milliseconds
  };

  const _fetchLastStakeTime = async (
    user: string,
    squadStakingQueryClient: TeritoriSquadStakingQueryClient
  ) => {
    const lastStakeTime: GetLastStakeTimeResponse =
      await squadStakingQueryClient.getLastStakeTime({
        user,
      });

    setLastStakeTime(moment(lastStakeTime.last_stake_time * 1000));
    setIsLastStakeTimeLoaded(true);
  };

  const updateStakingState = (
    currentSquad: GetSquadResponse | undefined,
    lastStakeTime: moment.Moment | undefined,
    squadStakingConfig: GetConfigResponse
  ) => {
    const now = moment();
    const coolDownDays = squadStakingConfig.cooldown_days;

    lastStakeTime = lastStakeTime || moment(0);
    const completesAt = moment(lastStakeTime).add(coolDownDays, "days");

    let _remainingTime = 0;
    let _stakingState = StakingState.UNKNOWN;
    let _remainingPercentage = 0;

    if (!currentSquad) {
      if (now.isAfter(completesAt)) {
        _stakingState = StakingState.COMPLETED;
      } else if (now.isAfter(lastStakeTime)) {
        _stakingState = StakingState.RELAX;
        _remainingTime = completesAt.diff(now);
      }
    } else {
      const startsAt = moment(currentSquad.start_time * 1000);
      const endsAt = moment(currentSquad.end_time * 1000);

      const totalStakingDuration = endsAt.diff(startsAt);
      const stakingTimePassed = now.diff(startsAt);

      const _passedPercentage = Math.min(
        100,
        Math.floor((stakingTimePassed * 100) / totalStakingDuration)
      );

      _remainingPercentage = 100 - _passedPercentage;

      if (now.isAfter(completesAt)) {
        _stakingState = StakingState.COMPLETED;
      } else if (now.isAfter(endsAt)) {
        _stakingState = StakingState.RELAX;
        _remainingTime = completesAt.diff(now);
      } else if (now.isAfter(startsAt)) {
        _stakingState = StakingState.ONGOING;
        _remainingTime = endsAt.diff(now);
      }
    }

    setStakingState(_stakingState);
    setRemainingTime(_remainingTime);
    setRemainingPercentage(_remainingPercentage);
    setIsStakingStateLoaded(true);
  };

  const startStakingTimer = (
    currentSquad: GetSquadResponse | undefined,
    lastStakeTime: moment.Moment | undefined,
    squadStakingConfig: GetConfigResponse
  ) => {
    if (timerRef.current) return;

    // Calculate current state and remaining time
    updateStakingState(currentSquad, lastStakeTime, squadStakingConfig); // Call immediately for the first time
    timerRef.current = setInterval(
      () => updateStakingState(currentSquad, lastStakeTime, squadStakingConfig),
      1000
    );
  };

  useEffect(() => {
    const user = selectedWallet?.address || "";
    if (!user || !squadStakingQueryClient) return;

    _fetchSquadStakingConfig(squadStakingQueryClient);
    _fetchSquadStaking(user, squadStakingQueryClient);
    _fetchLastStakeTime(user, squadStakingQueryClient);
  }, [squadStakingQueryClient?.contractAddress, selectedWallet?.address]); // Use attributes as dependencies to avoid deep compare

  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current);
      timerRef.current = undefined;
    };
  }, []);

  return {
    squadStakingClient,
    squadStakingQueryClient,
    squadStakingConfig,
    currentSquad,
    squadStake,
    squadWithdraw,
    estimateStakingDuration,
    remainingPercentage,
    remainingTime,
    stakingState,
    startStakingTimer,
    lastStakeTime,
    isSquadLoaded,
    isStakingStateLoaded,
    isLastStakeTimeLoaded,
    setCurrentSquad,
    updateStakingState,
  };
};
