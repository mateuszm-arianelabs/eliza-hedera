import {
    Action,
    composeContext,
    elizaLogger,
    generateObjectDeprecated,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";
import { HederaProvider } from "../../providers/client";
import { HederaNetworkType } from "../../shared/types.ts";
import { pendingAirdropTemplate } from "../../templates";
import { pendingAirdropsParams } from "./schema.ts";
import { GetPendingAirdropsService } from "./services/get-pending-airdrops.ts";

export const pendingAirdropsAction: Action = {
    name: "HEDERA_PENDING_AIRDROPS",
    description: "Returns currently pending airdrops for accountId",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        _callback?: HandlerCallback
    ) => {
        const pendingAirdropsContext = composeContext({
            state: state,
            template: pendingAirdropTemplate,
            templatingEngine: "handlebars",
        });

        const pendingAirdropContent = await generateObjectDeprecated({
            runtime: runtime,
            context: pendingAirdropsContext,
            modelClass: ModelClass.SMALL,
        });

        try {
            console.log(pendingAirdropContent);

            const pendingAirdropData = pendingAirdropsParams.parse(
                pendingAirdropContent
            );

            const accountId =
                pendingAirdropData.accountId ||
                runtime.getSetting("HEDERA_ACCOUNT_ID");

            const networkType = runtime.getSetting(
                "HEDERA_NETWORK_TYPE"
            ) as HederaNetworkType;

            const hederaProvider = new HederaProvider(runtime);
            const action = new GetPendingAirdropsService(hederaProvider);

            const pendingAirdrops = await action.execute(
                accountId,
                networkType
            );

            if (!pendingAirdrops.length) {
                await _callback({
                    text: `There is no pending airdrops for accountId ${accountId}`,
                    content: `There is no pending airdrops for accountId ${accountId}`,
                });
                return true;
            }

            const formatedAirdrops = pendingAirdrops
                .map(
                    (d, idx) =>
                        `(${idx + 1}) ${d.amount} Tokens (${d.token_id}) from ${d.sender_id}`
                )
                .join("\n");

            await _callback({
                text: `Here is pending airdrops for account ${accountId} \n\n ${formatedAirdrops}`,
                content: {
                    availableAirdrops: pendingAirdrops,
                },
            });

            return true;
        } catch (error) {
            elizaLogger.error("Error during fetching pending airdrops:", error);

            if (_callback) {
                await _callback({
                    text: `Error during fetching pending airdrops: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    validate: async (runtime: IAgentRuntime) => {
        const privateKey = runtime.getSetting("HEDERA_PRIVATE_KEY");
        const accountAddress = runtime.getSetting("HEDERA_ACCOUNT_ID");
        const selectedNetworkType = runtime.getSetting("HEDERA_NETWORK_TYPE");

        return !!(privateKey && accountAddress && selectedNetworkType);
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me pending airdrops for account {{0.0.5393076}}",
                    action: "HEDERA_PENDING_AIRDROPS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "",
                    action: "HEDERA_PENDING_AIRDROPS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Show me my pending airdrops",
                    action: "HEDERA_PENDING_AIRDROPS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "",
                    action: "HEDERA_PENDING_AIRDROPS",
                },
            },
        ],
    ],
    similes: ["PENDING_AIRDROPS", "GET_AIRDROPS", "GET_PENDING_AIRDROPS"],
};
