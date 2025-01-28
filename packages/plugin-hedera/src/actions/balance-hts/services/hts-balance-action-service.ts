import type { HederaHtsBalanceParams, IHtsBalanceResponse } from "../types.ts";
import { HederaProvider } from "../../../providers/client";
import { HederaNetworkType } from "../../../shared/types.ts";
import {HederaAgentKit} from "hedera-agent-kit";

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
            status: "success",
            balance: balance,
            unit: tokenDetails.name,
        };
    }
}
