import { HederaProvider } from "../../../providers/client";
import { DeleteTopicParams } from "../types.ts";
import { TopicId } from "@hashgraph/sdk";

export class DeleteTopicService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(params: DeleteTopicParams): Promise<void> {
        if (!params.topicId) {
            throw new Error("Missing topicId");
        }

        const agentKit = this.hederaProvider.getHederaAgentKit();
        const topicId = TopicId.fromString(params.topicId);

        // TODO: Refactor!

        return agentKit.deleteTopic(topicId);
    }
}
