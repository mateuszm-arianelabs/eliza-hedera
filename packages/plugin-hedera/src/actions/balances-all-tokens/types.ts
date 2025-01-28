import { z } from "zod";
import { hederaAllTokensBalancesParamsSchema } from "./schema.ts";
import { DetailedTokenBalance } from "hedera-agent-kit/dist/types";

export type HederaAllTokensBalancesParams = z.infer<
    typeof hederaAllTokensBalancesParamsSchema
>;

export type AllTokensBalancesResult = {
    status: "success" | "error";
    balancesArray: Array<DetailedTokenBalance>;
};
