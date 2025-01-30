export const balanceHbarTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about HBAR balance:
1. **Wallet Address**:
   - must be a string. Do not include dot after last character. Example of correct address: "0.0.539314"

2. **Symbol**:
   - Must be HBAR

Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "symbol": string,   // The symbol of token (HBAR).
    "address": string   // The wallet address.
\`\`\`

Example response for the input: "Show me HBAR balance of wallet 0.1.123123.", the response should be:
\`\`\`json
{
    "symbol": "HBAR",
    "address": "0.1.123123"
\`\`\`

Example response for the input: "Show me HBAR balance of wallet 0.0.539314.", the response should be:
\`\`\`json
{
    "symbol": "HBAR",
    "address": "0.0.539314"
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const balanceHtsTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}

Extract the data about last request. Do not use earlier provided wallet addresses nor token Ids.

Extract the following information about HTS balance request:
1. **Wallet Address**:
   - must be a string. Do not include dot after last character. Example of correct address: "0.0.539314".

2. **TokenId**:
   - Must be a string Do not include dot after last character. Example of correct tokenId: "0.0.5422268".

Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "tokenId": string,   // Id of the token.
    "address": string   // The wallet address.
\`\`\`

Example response for the input: "Show me balance of token 0.0.5424086 for wallet 0.0.5423981.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5424086",
    "address": "0.0.5423981"
\`\`\`
Note that the last dot '... for wallet 0.0.5423981.' was omitted while extracting wallet address.

Example response for the input: "Show me balance of HTS-TOKEN with id 0.0.5422268 for wallet 0.0.5423949.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422268",
    "address": "0.0.5423949"
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const balancesAllTokensTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about all tokens balances request:
1. **Wallet Address**:
   - must be a string. Do not include dot after last character. Example of correct address: "0.0.539314". If NOT PROVIDED use your hedera wallet from {{state}}!

Always try to first extract the wallet address from user prompt before taking your wallet address!
Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "address": string   // The wallet address.
\`\`\`

Example response for the input: "Show me tokens balances for wallet 0.1.123123.", the response should be:
\`\`\`json
{
    "address": "0.1.123123"
\`\`\`

Example response for the input: "Show me your token balances", assuming that in {{state}} you have your wallet defined as 0.0.539314 the response should be:
\`\`\`json
{
    "address": "0.0.539314"
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const rejectTokenTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about rejecting token request:
1. **Token id**:
   - must be a string. Do not include dot after last character. Example of correct token id: "0.0.539314".

Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. All fields are rquired:
\`\`\`json
{
    "tokenId": string   // Id of the token to reject
\`\`\`

Example response for the input: "Reject token 0.0.5445349.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5445349"
\`\`\`

Example response for the input: "Reject received airdrop of token 0.0.539314.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.539314"
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const associateTokenTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about associating tokens with account:
1. **Token id**
    - Must be a string Do not include dot after last character. Example of correct tokenId: "0.0.5422268".

Respond with a JSON markdown block containing only the extracted values. All fields are required:
\`\`\`json
{
    "tokenId": string,   // The tokenId address. Required
\`\`\`

Example response for the input: "Associate your wallet with token 0.0.5422268", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422268"
\`\`\`

Example response for the input: "Associate wallet with token 0.0.5422333", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422333"
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const tokenHoldersTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about all tokens balances request:
1. **Token Id**:
   - must be a string. Do not include dot after last character. Example of correct token id: "0.0.539314".
2. **Threshold**:
   - must be a number. It's **OPTIONAL**. Example: 1000

Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. Fields:
\`\`\`json
{
    "tokenId": string,   // The tokenId address. Required
    "threshold": number    // threshold, requested wallets should have more tokens than given threshold. Optional
}
\`\`\`

Example response for the input: "Can you show me the token holders for 0.0.3391484", the response should be:
\`\`\`json
{
    "tokenId": "0.0.3391484",
}
\`\`\`

Example response for the input: "Who owns token 0.0.5432123 and what are their balances? Include only wallets with more than 1234 tokens." the response should be:
\`\`\`json
{
    "tokenId": "0.0.5432123",
    "threshold": 1234
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;
