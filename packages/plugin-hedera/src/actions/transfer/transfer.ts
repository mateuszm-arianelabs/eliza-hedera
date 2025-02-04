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
import { hederaHBARTransferTemplate } from "../../templates";
import { HederaProvider } from "../../providers/client";
import { TransferHbarService } from "./services/transfer-hbar.ts";
import { transferDataParamsSchema } from "./schema.ts";

export const transferAction: Action = {
    name: "TRANSFER_HBAR",
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
                template: hederaHBARTransferTemplate,
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
                user: "{{user}}",
                content: {
                    text: "Transfer {{1}} HBAR to {{0.0.4515512}}",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Send {{10.5}} HBAR to account {{0.0.987654}}.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Move {{0.75}} HBAR to {{0.0.1234567}} now.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "I want to transfer {{5}} HBAR to {{0.0.7654321}}.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Can you send {{3.25}} HBAR to {{0.0.5555555}}?",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Transfer exactly {{8.8}} HBAR to {{0.0.9999999}}.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Make a transaction of {{15}} HBAR to {{0.0.6666666}}.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Please transfer {{2}} HBAR to {{0.0.3333333}} ASAP.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Move {{12.5}} HBAR from my wallet to {{0.0.2222222}}.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
        [
            {
                user: "{{user}}",
                content: {
                    text: "Send exactly {{50}} HBAR to {{0.0.7777777}}, please.",
                    action: "TRANSFER_HBAR",
                },
            },
            {
                user: "{{assistant}}",
                content: {
                    text: "",
                    action: "TRANSFER_HBAR",
                },
            },
        ],
    ],
    similes: ["SEND_HBAR", "HBAR_TRANSFER", "MOVE_HBAR"],
};
