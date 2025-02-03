import { HederaNetworkType } from "./types.ts";

export const generateHashscanUrl = (
    txHash: string,
    networkType: HederaNetworkType
) => {
    return `https://hashscan.io/${networkType}/tx/${txHash}`;
};
