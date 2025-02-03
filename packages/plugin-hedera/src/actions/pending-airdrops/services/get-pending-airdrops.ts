import { HederaProvider } from "../../../providers/client";
import { HederaNetworkType } from "../../../shared/types.ts";

export class GetPendingAirdropsService {
    constructor(private hederaProvider: HederaProvider) {}

    async execute(accountId: string, networkType: HederaNetworkType) {
        const agentKit = this.hederaProvider.getHederaAgentKit();

        return await agentKit.getPendingAirdrops(accountId, networkType);
    }
}
