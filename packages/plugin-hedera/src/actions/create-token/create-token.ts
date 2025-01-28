import {
    Action,
    composeContext, elizaLogger,
    generateObjectDeprecated,
    HandlerCallback,
    type IAgentRuntime,
    type Memory, ModelClass,
    type State,
} from "@elizaos/core";
import { hederaCreateTokenTemplate } from "../../templates";
import { HederaProvider } from "../../providers/client";
import { CreateTokenService } from "./services/create-token.ts";
import { createTokenParamsSchema } from "./schema.ts";

export const createTokenAction: Action = {
    name: "CREATE_TOKEN",
    description: "Create a new fungible token on the Hedera network",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ) => {
        try {
            const hederaCreateTokenContext = composeContext({
                state: state,
                template: hederaCreateTokenTemplate,
                templatingEngine: "handlebars",
            });

            const hederaCreateTokenContent = await generateObjectDeprecated({
                runtime: runtime,
                context: hederaCreateTokenContext,
                modelClass: ModelClass.SMALL,
            });

            const createTokenData = createTokenParamsSchema.parse(hederaCreateTokenContent);

            const hederaProvider = new HederaProvider(runtime)
            const createTokenService = new CreateTokenService(hederaProvider);

            const newTokenId = await createTokenService.execute(createTokenData)

            await callback({
                text: `Created new token with id: ${newTokenId.toString()}`,
                context: { newTokenId },
            });

            return true;
        } catch(error) {
            elizaLogger.error("Error during token creation:", error);

            await callback({
                text: `Error during token creation: ${error.message}`,
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
                    text: "I'll help you create new token MyToken MTK, with 8 decimals and 1000 initial supply",
                    action: "CREATE_TOKEN",
                },
            },
            {
                user: "user",
                content: {
                    text: "Create new token with name MyToken with symbol MTK, 8 decimals and 1000 initial supply",
                    action: "CREATE_TOKEN",
                },
            },
        ],
    ],
    similes: ["NEW_TOKEN", "CREATE_NEW_TOKEN", "NEW_FUNGIBLE_TOKEN"],
};
