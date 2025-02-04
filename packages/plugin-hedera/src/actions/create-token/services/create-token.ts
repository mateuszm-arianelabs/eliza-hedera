import { CreateTokenParams } from "../types.ts";
import { HederaProvider } from "../../../providers/client";
import { CreateTokenResult } from "hedera-agent-kit/dist/types";

export class CreateTokenService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(params: CreateTokenParams): Promise<CreateTokenResult> {
        if (!params.name) {
            throw new Error("Missing name of token");
        }

        if (!params.symbol) {
            throw new Error("Missing symbol of token");
        }

        if (!params.decimals) {
            throw new Error("Missing decimals of token");
        }

        if (!params.initialSupply) {
            throw new Error("Missing initial supply of token");
        }

        const agentKit = this.hederaProvider.getHederaAgentKit();

        const initialSupplyBaseUnit =
            params.initialSupply * 10 ** params.decimals;

        return agentKit.createFT(
            params.name,
            params.symbol,
            params.decimals,
            initialSupplyBaseUnit
        );
    }
}
