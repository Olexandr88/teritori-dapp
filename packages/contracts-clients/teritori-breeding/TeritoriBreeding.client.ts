/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.16.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import {
  CosmWasmClient,
  SigningCosmWasmClient,
  ExecuteResult,
} from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {
  Uint128,
  Addr,
  Config,
  ExecuteMsg,
  Metadata,
  Attribute,
  InstantiateMsg,
  QueryMsg,
} from "./TeritoriBreeding.types";

// TODO: Ask Yield to add these types
type ConfigResponse = any;
type BreedInfoResponse = any;
type BreededCountResponse = any;
type BreedRequestsCountResponse = any;
type BreedFinishedCountResponse = any;

export interface TeritoriBreedingReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  breedInfo: ({ breedId }: { breedId: number }) => Promise<BreedInfoResponse>;
  breededCount: ({
    parentNftTokenId,
  }: {
    parentNftTokenId: string;
  }) => Promise<BreededCountResponse>;
  breedRequestsCount: () => Promise<BreedRequestsCountResponse>;
  breedFinishedCount: () => Promise<BreedFinishedCountResponse>;
}
export class TeritoriBreedingQueryClient
  implements TeritoriBreedingReadOnlyInterface
{
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.breedInfo = this.breedInfo.bind(this);
    this.breededCount = this.breededCount.bind(this);
    this.breedRequestsCount = this.breedRequestsCount.bind(this);
    this.breedFinishedCount = this.breedFinishedCount.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    });
  };
  breedInfo = async ({
    breedId,
  }: {
    breedId: number;
  }): Promise<BreedInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      breed_info: {
        breed_id: breedId,
      },
    });
  };
  breededCount = async ({
    parentNftTokenId,
  }: {
    parentNftTokenId: string;
  }): Promise<BreededCountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      breeded_count: {
        parent_nft_token_id: parentNftTokenId,
      },
    });
  };
  breedRequestsCount = async (): Promise<BreedRequestsCountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      breed_requests_count: {},
    });
  };
  breedFinishedCount = async (): Promise<BreedFinishedCountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      breed_finished_count: {},
    });
  };
}
export interface TeritoriBreedingInterface
  extends TeritoriBreedingReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateConfig: (
    {
      breedCountLimit,
      breedDuration,
      breedPriceAmount,
      breedPriceDenom,
      owner,
    }: {
      breedCountLimit?: number;
      breedDuration?: number;
      breedPriceAmount?: Uint128;
      breedPriceDenom?: string;
      owner?: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  startBreed: (
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  breed: (
    {
      nftTokenId1,
      nftTokenId2,
    }: {
      nftTokenId1: string;
      nftTokenId2: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  mint: (
    {
      extension,
      tokenId,
      tokenUri,
    }: {
      extension?: Metadata;
      tokenId: string;
      tokenUri?: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  withdraw: (
    {
      breedId,
    }: {
      breedId: number;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  withdrawFund: (
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
}
export class TeritoriBreedingClient
  extends TeritoriBreedingQueryClient
  implements TeritoriBreedingInterface
{
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.startBreed = this.startBreed.bind(this);
    this.breed = this.breed.bind(this);
    this.mint = this.mint.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.withdrawFund = this.withdrawFund.bind(this);
  }

  updateConfig = async (
    {
      breedCountLimit,
      breedDuration,
      breedPriceAmount,
      breedPriceDenom,
      owner,
    }: {
      breedCountLimit?: number;
      breedDuration?: number;
      breedPriceAmount?: Uint128;
      breedPriceDenom?: string;
      owner?: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          breed_count_limit: breedCountLimit,
          breed_duration: breedDuration,
          breed_price_amount: breedPriceAmount,
          breed_price_denom: breedPriceDenom,
          owner,
        },
      },
      fee,
      memo,
      funds
    );
  };
  startBreed = async (
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        start_breed: {},
      },
      fee,
      memo,
      funds
    );
  };
  breed = async (
    {
      nftTokenId1,
      nftTokenId2,
    }: {
      nftTokenId1: string;
      nftTokenId2: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        breed: {
          nft_token_id1: nftTokenId1,
          nft_token_id2: nftTokenId2,
        },
      },
      fee,
      memo,
      funds
    );
  };
  mint = async (
    {
      extension,
      tokenId,
      tokenUri,
    }: {
      extension?: Metadata;
      tokenId: string;
      tokenUri?: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        mint: {
          extension,
          token_id: tokenId,
          token_uri: tokenUri,
        },
      },
      fee,
      memo,
      funds
    );
  };
  withdraw = async (
    {
      breedId,
    }: {
      breedId: number;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        withdraw: {
          breed_id: breedId,
        },
      },
      fee,
      memo,
      funds
    );
  };
  withdrawFund = async (
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        withdraw_fund: {},
      },
      fee,
      memo,
      funds
    );
  };
}
