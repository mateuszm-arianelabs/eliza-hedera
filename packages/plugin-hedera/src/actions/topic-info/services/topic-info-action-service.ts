import { HederaProvider } from "../../../providers/client";
import { HederaAgentKit } from "hedera-agent-kit";
import { HederaTopicInfoParams } from "../types.ts";
import { TopicId } from "@hashgraph/sdk";
import { HederaNetworkType } from "../../../shared/types.ts";
import { TopicInfoApiResponse } from "hedera-agent-kit/dist/types";
import { convertTimestampToUTC } from "../../../shared/utils.ts";

export class TopicInfoActionService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(
        params: HederaTopicInfoParams,
        networkType: HederaNetworkType
    ): Promise<string> {
        if (!params.topicId) {
            throw new Error("No token id provided!");
        }

        const agentKit: HederaAgentKit =
            this.hederaProvider.getHederaAgentKit();

        const topicInfo: TopicInfoApiResponse = await agentKit.getTopicInfo(
            TopicId.fromString(params.topicId),
            networkType
        );

        const adminKey = topicInfo.admin_key.key
            ? `${topicInfo.admin_key.key}\n   type: ${topicInfo.admin_key._type}`
            : `not available`;
        const submitKey = topicInfo.submit_key.key
            ? `${topicInfo.submit_key.key}\n   type: ${topicInfo.submit_key._type}`
            : `not available`;
        const creationTimeUtc = convertTimestampToUTC(
            topicInfo.created_timestamp
        );
        const expirationTimeUtc = topicInfo.created_timestamp
            ? convertTimestampToUTC(topicInfo.created_timestamp)
            : "null";

        const memo = topicInfo.memo ? topicInfo.memo : `not available`;

        return [
            "--------------------------------------",
            `Memo: ${memo}`,
            `Creation time: ${creationTimeUtc}`,
            `Expiration time: ${expirationTimeUtc}`,
            "Admin key:",
            `   ${adminKey}`,
            "Submit key:",
            `   ${submitKey}`,
            `Deleted: ${topicInfo.deleted}`,
            "--------------------------------------",
        ].join("\n");
    }
}
