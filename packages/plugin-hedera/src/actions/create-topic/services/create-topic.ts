import { HederaProvider } from "../../../providers/client";
import { CreateTopicParams } from "../types.ts";

export class CreateTopicService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(params: CreateTopicParams) {
        if (!params.memo) {
            throw new Error("Missing memo of new topic");
        }

        const agentKit = this.hederaProvider.getHederaAgentKit();

        return agentKit.createTopic(params.memo);
    }
}
