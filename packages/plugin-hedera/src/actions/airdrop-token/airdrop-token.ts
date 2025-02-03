import { hederaAirdropTokenTemplate } from "../../templates";
import {
    Action,
    composeContext,
    elizaLogger,
    generateObjectDeprecated,
    HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
} from "@elizaos/core";
import { HederaProvider } from "../../providers/client";
import { airdropTokenParamsSchema } from "./schema.ts";
import { AirdropTokenService } from "./services/airdrop-token.ts";

export const airdropTokenAction: Action = {
    name: "HEDERA_AIRDROP_TOKEN",
    description: "Airdrop a token on the Hedera network",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ) => {
        try {
            const hederaAirdropTokenContext = composeContext({
                state: state,
                template: hederaAirdropTokenTemplate,
                templatingEngine: "handlebars",
            });

            const hederaAirdropTokenContent = await generateObjectDeprecated({
                runtime: runtime,
                context: hederaAirdropTokenContext,
                modelClass: ModelClass.SMALL,
            });

            const airdropTokenData = airdropTokenParamsSchema.parse(
                hederaAirdropTokenContent
            );

            const hederaProvider = new HederaProvider(runtime);
            const airdropTokenService = new AirdropTokenService(hederaProvider);

            await airdropTokenService.execute(airdropTokenData);

            await callback({
                text: `Airdrop token successfully executed.`,
            });

            return true;
        } catch (error) {
            elizaLogger.error("Error during token airdrop:", error);

            await callback({
                text: `Error during token airdrop: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }
    },
    validate: async (runtime) => {
        const privateKey = runtime.getSetting("HEDERA_PRIVATE_KEY");
        const accountAddress = runtime.getSetting("HEDERA_ACCOUNT_ID");
        const selectedNetworkType = runtime.getSetting("HEDERA_NETWORK_TYPE");

        return !!(privateKey && accountAddress && selectedNetworkType);
    },
    examples: [
        [
            {
                user: "assistant",
                content: {
                    text: "I'll help you airdrop tokens",
                    action: "HEDERA_AIRDROP_TOKEN",
                },
            },
            {
                user: "user",
                content: {
                    text: "Airdrop 5.5 tokens 0.0.5425085 for 0.0.5398121, 0.0.5393967, 0.0.5395127",
                    action: "HEDERA_AIRDROP_TOKEN",
                },
            },
        ],
    ],
    similes: ["DROP_TOKEN", "AIRDROP_TOKEN", "AIRDROP_TOKENS"],
};
