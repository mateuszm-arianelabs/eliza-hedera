import { HederaProvider } from "../../../providers/client";
import { HederaAgentKit } from "hedera-agent-kit";
import { HederaAssociateTokenParams } from "../types.ts";
import {
    AssociateTokenResult,
    HederaNetworkType,
} from "hedera-agent-kit/dist/types";

export class AssociateTokenActionService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(
        params: HederaAssociateTokenParams,
        networkType: HederaNetworkType
    ): Promise<AssociateTokenResult> {
        if (!params.tokenId) {
            throw new Error("No token id");
        }

        const agentKit: HederaAgentKit =
            this.hederaProvider.getHederaAgentKit();

        return await agentKit.associateToken(params.tokenId, networkType);
    }
}
