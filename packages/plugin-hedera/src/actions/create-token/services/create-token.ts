import { CreateTokenParams } from "../types.ts";
import { HederaProvider } from "../../../providers/client";
import { TokenId } from "@hashgraph/sdk";

export class CreateTokenService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(params: CreateTokenParams): Promise<TokenId> {
        if(!params.name) {
            throw new Error("Missing name of token");
        }

        if(!params.symbol) {
            throw new Error("Missing symbol of token");
        }

        if(!params.decimals) {
            throw new Error("Missing decimals of token");
        }

        if(!params.initialSupply) {
            throw new Error("Missing initial supply of token");
        }

        const agentKit = this.hederaProvider.getHederaAgentKit();
        return agentKit.createFT(
            params.name,
            params.symbol,
            params.decimals,
            params.initialSupply
        )
    }
}
