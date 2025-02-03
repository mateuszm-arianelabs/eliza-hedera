import type { HederaHtsBalanceParams, IHtsBalanceResponse } from "../types.ts";
import { HederaProvider } from "../../../providers/client";
import { HederaNetworkType } from "../../../shared/types.ts";
import { HederaAgentKit } from "hedera-agent-kit";
import { toDisplayUnit } from "hedera-agent-kit/dist/utils/hts-format-utils";

export class HtsBalanceActionService {
    constructor(private hederaProvider: HederaProvider) {
        this.hederaProvider = hederaProvider;
    }

    async execute(
        params: HederaHtsBalanceParams,
        networkType: HederaNetworkType
    ): Promise<IHtsBalanceResponse> {
        const agentKit: HederaAgentKit =
            this.hederaProvider.getHederaAgentKit();
        const balance = await agentKit.getHtsBalance(
            params.tokenId,
            networkType,
            params.address
        );
        const tokenDetails = await agentKit.getHtsTokenDetails(
            params.tokenId,
            networkType
        );

        return {
            status: "SUCCESS",
            balance: await toDisplayUnit(
                params.tokenId,
                balance,
                networkType
            ).then((b) => b.toString()),
            unit: tokenDetails.name,
        };
    }
}
