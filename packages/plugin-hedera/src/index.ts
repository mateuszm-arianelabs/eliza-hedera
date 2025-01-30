import type { Plugin } from "@elizaos/core";
import { hederaClientProvider } from "./providers/client";
import { balanceHbarAction } from "./actions/balance-hbar/balance-hbar.ts";
import { balanceHtsAction } from "./actions/balance-hts/balance-hts.ts";
import { balancesAllTokensAction } from "./actions/balances-all-tokens/balance-all-tokens.ts";
import { transferAction } from "./actions/transfer/transfer.ts";
import { createTokenAction } from "./actions/create-token/create-token.ts";
import { associateTokenAction } from "./actions/associate-token/associate-token.ts";
import { tokenHoldersAction } from "./actions/token-holders/token-holders.ts";

export const hederaPlugin: Plugin = {
    name: "Hedera",
    description: "Hedera blockchain integration plugin",
    providers: [hederaClientProvider],
    evaluators: [],
    services: [],
    actions: [
        balanceHbarAction,
        balanceHtsAction,
        balancesAllTokensAction,
        transferAction,
        createTokenAction,
        tokenHoldersAction,
        associateTokenAction,
    ],
};

export default hederaPlugin;
