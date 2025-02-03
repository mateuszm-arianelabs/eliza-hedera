import { z } from "zod";
import { hederaHbarBalanceParamsSchema } from "./schema.ts";

export type HederaHbarBalanceParams = z.infer<
    typeof hederaHbarBalanceParamsSchema
>;

export type IHbarBalanceResponse = {
    status: "SUCCESS" | "ERROR";
    balance: number;
    unit: string;
};
