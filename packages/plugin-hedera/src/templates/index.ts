export const hederaTransferTemplate = `Given the recent messages and hedera wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about the requested transfer:
1. **Amount**:
   - Extract only the numeric value from the instruction.
   - The value must be a string representing the amount in the display denomination (e.g., "0.0001" for HBAR). Do not include the symbol.

2. **Recipient AccountId**:
   - Must be a valid hedera account id in template "0.0.NUMBER".
   - Return value always as string, Examples: "0.0.123", "0.0.2314"

Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "amount": string, // The amount to transfer as a string.
    "accountId": string // The recipient's accountId.
}
\`\`\`

Example reponse for the input: "Make transfer 0.10HBAR to 0.0.4515512", the response should be:
\`\`\`json
{
    "amount": "0.10",
    "accountId": "0.0.4515512"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const hederaCreateTokenTemplate = `Given the recent messages and hedera wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about the token to create in hedera:
1. **Token name**:
   - Extract name of the token.
   - The value must be a string representing the name of the new token.

2. **Token Symbol**:
   - The token symbol is specified as a string.
   - The string should contains only capitalized letters.

3. **Decimals**:
   - Extract only the numeric value from the instruction.
   - The number of decimal places a token is divisible by.

4. **Initial Supply**:
   - Extract only the numeric value from the instruction.
   - Specifies the initial supply of fungible tokens to be put in circulation.

Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "name": string, // Name of the new token to create.
    "symbol": string, // Token symbol as uppercase short string
    "decimals": number, // Token decimals as number.
    "initialSupply": number // Initial supply of fungible tokens
}
\`\`\`

Example reponse for the input: "Create new token with name MyToken with symbol MTK, 8 decimals and 1000 initial supply", the response should be:
\`\`\`json
{
    "name": "MyToken",
    "symbol": "MTK",
    "decimals": 8,
    "initialSupply": 1000
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const hederaAirdropTokenTemplate = `Given the recent messages and hedera wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about the token airdrop in hedera:
1. **Token id**:
   - Extract id of the token to airdrop.
   - The value must be a string representing id of token.

2. **Recipients**:
   - Extract recipients as array of strings.
   - Each element of array must be a string which represent accountId of recipient.

3. **Amount**:
   - Extract value of token to send to recipients.
   - The value must be number, represent amount of tokens to send.

Respond with a JSON markdown block containing only the extracted values.
All fields are required, recipients array should have minimum one accountId(string):
\`\`\`json
{
    "tokenId": string, // TokenId to airdrop
    "recipients": string[], // Recipients is array of accountIds(string)
    "amount": number // Token amount to send to recipients.
}
\`\`\`

Example reponse for the input: "Airdrop 5.5 tokens 0.0.5425085 for 0.0.5398121, 0.0.5393967, 0.0.5395127", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5425085",
    "recipients": ["0.0.5398121", "0.0.5393967", "0.0.5395127"],
    "amount": 5.5
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const pendingAirdropTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
If in message there is no accountId or some think that looks similar to accountId for example: "0.0.5422268", return this json.
\`\`\`json
{
    "accountId": null
}
\`\`\`
If message include accountId for example "0.0.5422268" extract this data with following instructions.
1. **Account Id**
    - Account Id should look like "0.0.5422268" and should be a string.
    - Account Id as string cant have other chars than numbers 0 to 9 and dots.
    - Dots cant start accountId string or end, there is always number on start and end.
    - If you cant find accountId returns structure with account id equast null.
    - Example account ids are "0.0.5422268", "0.0.4515756"

Respond with a JSON markdown block containing only the extracted values. accountId:
\`\`\`json
{
    "accountId": string | null   // The accountId for example "0.0.4515756" or if doesnt exist null
}
\`\`\`

Example response for the input: "Show me my pending airdrops", the response should be:
\`\`\`json
{
    "accountId": null
}
\`\`\`

Example response for the input: "Show me my airdrops", the response should be:
\`\`\`json
{
    "accountId": null
}
\`\`\`

Example response for the input: "Show pending airdrops for 0.0.4515756", the response should be:
\`\`\`json
{
    "accountId": "0.0.4515756"
}
\`\`\`

Example response for the input: "Show me airdrops for 0.0.5422268", the response should be:
\`\`\`json
{
    "accountId": "0.0.5422268"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const claimAirdropTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract data of pending token airdrop from message with following instructions.
1. **Sender Id**
    - Sender Id should look like "0.0.5422268" and should be a string.
    - Sender Id as string cant have other chars than numbers 0 to 9 and dots.
    - Dots can't start senderId string or end, there is always a number on the start and end.
    - Example sender ids are "0.0.5422268", "0.0.4515756"

3. **Token Id**
    - Token Id should looks like "0.0.5422268" and should be string.
    - Token Id as string cant have other chars than numbers 0 to 9 and dots.
    - Dots can't start tokenId string or end, there is always a number on the start and end.
    - Example token ids are "0.0.5447843", "0.0.4515756"

Respond with a JSON markdown block containing only the extracted values:
\`\`\`json
{
    "senderId": string,   // The senderId for example "0.0.4515756"
    "tokenId": string   // The tokenId for example "0.0.4515756"
}
\`\`\`

The message commonly have structure like "Claim airdrop (1) 5 Tokens (TOKEN_ID) from SENDER_ID" where TOKEN_ID and SENDER_ID are variables to extract.

Example response for the input: "Claim airdrop (1) 5 Tokens (0.0.5445766) from 0.0.5393076", the response should be:
\`\`\`json
{
    "senderId": "0.0.5393076",
    "tokenId": "0.0.5445766"
}
\`\`\`

Example response for the input: "Claim airdrop (2) 50 Tokens (0.0.5447843) from 0.0.5393076", the response should be:
\`\`\`json
{
    "senderId": "0.0.5393076",
    "tokenId": "0.0.5447843"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const hederaTransferTokenTemplate = `Given the recent messages and hedera wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about the token transaction:
1. **tokenId**:
   - Extract id of the token.
   - The value must be a string representing id of token on hedera chain.
   - Example tokenId: "0.0.5425085"

2. **toAccountId**:
   - Extract recipient account Id specified as a string.
   - The string should contains only numbers and dots.
   - Example accountId: "0.0.4515512"

3. **amount**:
   - Extract only the numeric value from the instruction.
   - The amount of tokens to send as decimal number.

Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "tokenId": string, // Id of token to send as a string.
    "toAccountId": string, // Recipient account Id specified as a string.
    "amount": number // Amount of tokens to send as number.
\`\`\`

Example reponse for the input: "Make transfer 3.10 of tokens 0.0.5425085 to account 0.0.4515512", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5425085",
    "toAccountId": "0.0.4515512",
    "amount": 3.10
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const hederaCreateTopicTemplate = `Given the recent messages and hedera wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about the new topic:
1. **Topic memo**:
   - Extract string representing memo of topic.
   - The value must be a string, may be single or multiple words.
   - Example topic memo: "crypto", "token transfer logs"

Respond with a JSON markdown block containing only the extracted values. All fields are required:
\`\`\`json
{
    "memo": string // String representing memo of topic.
}
\`\`\`

Example reponse for the input: "Create new topic with crypto memo", the response should be:
\`\`\`json
{
    "memo": "crypto"
}
\`\`\`

Example reponse for the input: "Create new topic with memo token transfer logs", the response should be:
\`\`\`json
{
    "memo": "token transfer logs"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const hederaDeleteTopicTemplate = `Given the recent messages and hedera wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about the topic to delete:
1. **Topic Id**
    - Topic Id should look like "0.0.5422268" and should be a string.
    - Topic Id as string cant have other chars than numbers 0 to 9 and dots.
    - Dots can't start Topic Id string or end, there is always a number on the start and end.
    - Example topic ids are "0.0.5422268", "0.0.4515756"

Respond with a JSON markdown block containing only the extracted values. All fields are required:
\`\`\`json
{
    "topicId": string // String representing topicId
}
\`\`\`

Example reponse for the input: "Delete topic 0.0.5464449", the response should be:
\`\`\`json
{
    "topicId": "0.0.5464449"
}
\`\`\`

Example reponse for the input: "Delete topic 0.0.5464185", the response should be:
\`\`\`json
{
    "memo": "0.0.5464185"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;
