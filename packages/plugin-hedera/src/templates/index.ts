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
`
