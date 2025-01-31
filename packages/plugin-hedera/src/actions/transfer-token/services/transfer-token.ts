import { HederaProvider } from "../../../providers/client";
import { TransferTokenParams } from "../types.ts";
import { TokenId } from "@hashgraph/sdk";

export class TransferTokenService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(params: TransferTokenParams): Promise<void> {
        if (!params.tokenId) {
            throw new Error("Missing tokenId");
        }

        if (!params.toAccountId) {
            throw new Error("Missing recipient accountId");
        }

        if (!params.amount) {
            throw new Error("Missing amount of token");
        }

        const agentKit = this.hederaProvider.getHederaAgentKit();

        const tokenId = TokenId.fromString(params.tokenId);

        return agentKit.transferToken(
            tokenId,
            params.toAccountId,
            params.amount
        );
    }
}
