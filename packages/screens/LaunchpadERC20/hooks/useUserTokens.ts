import useSelectedWallet from "@/hooks/useSelectedWallet";
import { getGnoNetwork, getNetworkFeature, NetworkFeature } from "@/networks";
import { extractGnoJSONString } from "@/utils/gno";
import { zodToken } from "@/utils/launchpadERC20/types";
import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const useUserTokens = (networkId: string) => {
    const selectedWallet = useSelectedWallet();
    const caller = selectedWallet?.address;
    return useQuery(["userTokens"], async () => {
        const gnoNetwork = getGnoNetwork(networkId);
        if (!gnoNetwork) {
            return null;
        }

        const pmFeature = getNetworkFeature(
            networkId,
            NetworkFeature.LaunchpadERC20,
        );

        if (!pmFeature) {
            return null;
        }

        const client = new GnoJSONRPCProvider(gnoNetwork.endpoint);
        const pkgPath = pmFeature.launchpadERC20PkgPath;
        const query = `GetUserTokensJSON(${caller})`;
        console.log(query);
        const contractData = await client.evaluateExpression(pkgPath, query);

        const res = extractGnoJSONString(contractData);
        console.log(res);

        const tokens = z.array(zodToken).parse(res);
        return tokens;
    });
};