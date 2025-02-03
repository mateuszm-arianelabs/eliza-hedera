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
import { hederaTransferTemplate } from "../../templates";
import { HederaProvider } from "../../providers/client";
import { TransferHbarService } from "./services/transfer-hbar.ts";
import { transferDataParamsSchema } from "./schema.ts";

export const transferAction: Action = {
    name: "HEDERA_TRANSFER_HBAR",
    description: "Transfer HBAR between addresses on the same chain",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: unknown,
        callback?: HandlerCallback
    ) => {
        try {
            const hederaTransferContext = composeContext({
                state: state,
                template: hederaTransferTemplate,
                templatingEngine: "handlebars",
            });

            const hederaTransferContent = await generateObjectDeprecated({
                runtime: runtime,
                context: hederaTransferContext,
                modelClass: ModelClass.SMALL,
            });

            const hederaTransferData = transferDataParamsSchema.parse(
                hederaTransferContent
            );

            const hederaProvider = new HederaProvider(runtime);
            const transferHbarService = new TransferHbarService(hederaProvider);

            const tx = await transferHbarService.execute(hederaTransferData);

            await callback({
                text: `HBAR transfer successfully. ${tx.toString()}`,
            });

            return true;
        } catch (error) {
            elizaLogger.error("Error during HBAR transfer:", error);

            await callback({
                text: `Error during HBAR transfer: ${error.message}`,
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
                    text: "I'll help you transfer 1 HBAR to 0.0.4515512",
                    action: "HEDERA_TRANSFER_HBAR",
                },
            },
            {
                user: "user",
                content: {
                    text: "Transfer 1 HBAR to 0.0.4515512",
                    action: "HEDERA_TRANSFER_HBAR",
                },
            },
        ],
    ],
    similes: ["TRANSFER_HBAR", "SEND_HBAR", "HBAR_TRANSFER", "MOVE_HBAR"],
};
