import { HederaNetworkType } from "./types.ts";

export function convertTimestampToUTC(timestamp: string): string {
    const [seconds, nanos] = timestamp.split(".").map(Number);
    const milliseconds = Math.round(nanos / 1_000_000); // Convert nanoseconds to milliseconds
    return new Date(seconds * 1000 + milliseconds).toISOString();
}

export const generateHashscanUrl = (
    txHash: string,
    networkType: HederaNetworkType
) => {
    return `https://hashscan.io/${networkType}/tx/${txHash}`;
};
