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
import { hederaCreateTopicTemplate } from "../../templates";
import { createTopicParamsSchema } from "./schema.ts";
import { HederaProvider } from "../../providers/client";
import { CreateTopicService } from "./services/create-topic.ts";

export const createTopicAction: Action = {
    name: "HEDERA_CREATE_TOPIC",
    description: "Create topic with hedera consensus service for messaging.",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ) => {
        try {
            const createTopicContext = composeContext({
                state,
                template: hederaCreateTopicTemplate,
                templatingEngine: "handlebars",
            });

            const createTopicContent = await generateObjectDeprecated({
                runtime: runtime,
                context: createTopicContext,
                modelClass: ModelClass.SMALL,
            });

            const createTopicData =
                createTopicParamsSchema.parse(createTopicContent);

            const hederaProvider = new HederaProvider(runtime);
            const action = new CreateTopicService(hederaProvider);

            const newTopicId = await action.execute(createTopicData);

            await callback({
                text: `Created new topic with id: ${newTopicId.toString()}`,
                context: { newTopicId },
            });

            return true;
        } catch (error) {
            elizaLogger.error("Error during topic creation:", error);

            await callback({
                text: `Error during topic creation: ${error.message}`,
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
                    text: "I'll help you create new with memo: crypto",
                    action: "CREATE_TOKEN",
                },
            },
            {
                user: "user",
                content: {
                    text: "Create new topic with {{crypto}} memo",
                    action: "CREATE_TOKEN",
                },
            },
        ],
        [
            {
                user: "assistant",
                content: {
                    text: "I'll help you create new with memo: crypto",
                    action: "CREATE_TOKEN",
                },
            },
            {
                user: "user",
                content: {
                    text: 'Create for me new topic with memo "{{MyToken transaction logs}}"',
                    action: "CREATE_TOKEN",
                },
            },
        ],
    ],
    similes: ["CREATE_TOPIC", "NEW_TOPIC", "HEDERA_NEW_TOPIC"],
};
