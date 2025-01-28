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
