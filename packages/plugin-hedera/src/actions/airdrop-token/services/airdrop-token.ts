import { HederaProvider } from "../../../providers/client";
import { AirdropRecipient, AirdropTokenParams } from "../types.ts";
import { TokenId } from "@hashgraph/sdk";

export class AirdropTokenService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(params: AirdropTokenParams): Promise<void> {
        if (!params.tokenId) {
            throw new Error("Missing tokenId");
        }

        if (!params.recipients || !params.recipients.length) {
            throw new Error("Missing recipients");
        }

        if (!params.amount) {
            throw new Error("Missing amount to airdrop");
        }

        const tokenId = TokenId.fromString(params.tokenId);

        const recipients: AirdropRecipient[] = params.recipients.map((r) => ({
            accountId: r,
            amount: params.amount,
        }));

        const agentKit = this.hederaProvider.getHederaAgentKit();
        return agentKit.airdropToken(tokenId, recipients);
    }
}
