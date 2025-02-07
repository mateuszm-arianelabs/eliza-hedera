export const balanceHbarTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about HBAR balance:
1. **Wallet Address**:
   - must be a string. Do not include dot after last character. Example of correct address: "0.0.539314"

2. **Symbol**:
   - Must be HBAR

Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "symbol": string,
    "address": string
\`\`\`

Example response for the input: "Show me HBAR balance of wallet 0.1.123123.", the response should be:
\`\`\`json
{
    "symbol": "HBAR",
    "address": "0.1.123123"
}
\`\`\`

Example response for the input: "Show me HBAR balance of wallet 0.0.539314.", the response should be:
\`\`\`json
{
    "symbol": "HBAR",
    "address": "0.0.539314"
}
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

Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "tokenId": string,
    "address": string
}
\`\`\`

Example response for the input: "Show me balance of token 0.0.5424086 for wallet 0.0.5423981.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5424086",
    "address": "0.0.5423981"
}
\`\`\`
Note that the last dot '... for wallet 0.0.5423981.' was omitted while extracting wallet address.

Example response for the input: "Show me balance of HTS-TOKEN with id 0.0.5422268 for wallet 0.0.5423949.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422268",
    "address": "0.0.5423949"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const balancesAllTokensTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about all tokens balances request:
1. **Wallet Address**:
   - must be a string. Do not include dot after last character. **OPTIONAL PARAMETER!!!**

Always try to first extract the wallet address from user prompt.
Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. All fields except 'token' are required:
\`\`\`json
{
    "address": string
}
\`\`\`

Example response for the input: "Show me tokens balances for wallet 0.1.123123.", the response should be:
\`\`\`json
{
    "address": "0.1.123123"
}
\`\`\`

Example response for the input: "Show me your token balances", the response should be:
\`\`\`json
{
    "address": null
}
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
Respond with a JSON markdown block containing only the extracted values. All fields are required:
\`\`\`json
{
    "tokenId": string
}
\`\`\`

Example response for the input: "Reject token 0.0.5445349.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5445349"
}
\`\`\`

Example response for the input: "Reject received airdrop of token 0.0.539314.", the response should be:
\`\`\`json
{
    "tokenId": "0.0.539314"
}
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
    "tokenId": string,
}
\`\`\`

Example response for the input: "Associate your wallet with token 0.0.5422268", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422268"
}
\`\`\`

Example response for the input: "Associate wallet with token 0.0.5422333", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422333"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const dissociateTokenTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}
Extract the following information about dissociating tokens with account:
1. **Token id**
    - Must be a string. Do not include dot after last character. Example of correct tokenId: "0.0.5422268".

Respond with a JSON markdown block containing only the extracted values. All fields are required:
\`\`\`json
{
    "tokenId": string,
}
\`\`\`

Example response for the input: "Dissociate your wallet with token 0.0.5422268", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422268"
}
\`\`\`

Example response for the input: "Dissociate wallet with token 0.0.5422333", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5422333"
}
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
    "tokenId": string,
    "threshold": number
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

export const topicInfoTemplate = `Given the recent messages
{{recentMessages}}
Extract the following information requested topic id:
1. **Topic Id**:
   - must be a string. Do not include dot after last character. Example of correct topic id: "0.0.5469474".

Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted value. Structure:
\`\`\`json
{
    "topicId": string
}
\`\`\`

Example response for the input: "Can you show me info about topic 0.0.5469474", the response should be:
\`\`\`json
{
    "topicId": "0.0.5469474"
}
\`\`\`

Example response for the input: "Show me details for topic 0.0.5469475" the response should be:
\`\`\`json
{
    "topicId": "0.0.5469475"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const submitTopicMessageTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}

Extract the following information about message to submit to topic request:
1. **Topic Id**:
   - must be a string. Do not include dot after last character. Example of correct topicId: "0.0.539314".

2. **Message Body**:
   - Must be a string.

Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. All fields are required:
\`\`\`json
{
    "topicId": string,
    "message": string
}
\`\`\`

Example response for the input: "Submit message: 'test message' to topic 0.0.5423981.", the response should be:
\`\`\`json
{
    "topicId": "0.0.5423981",
    "message": "test message"
}
\`\`\`

Example response for the input: "Submit message 'test message2' topic 0.0.5423966.", the response should be:
\`\`\`json
{
    "topicId": "0.0.5423966",
    "message": "test message2"
}
\`\`\`

Example response for the input: "I want post to topic 0.0.5423966. Message: test message3.", the response should be:
\`\`\`json
{
    "topicId": "0.0.5423966",
    "message": "test message3"
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;

export const mintTokenTemplate = `Given the recent messages and wallet information below:
{{recentMessages}}
{{walletInfo}}

Extract the following information about message to submit to topic request:
1. **Token Id**:
   - must be a string. Do not include dot after last character. Example of correct topicId: "0.0.539314".

2. **Amount**:
   - Must be a number.
   - amount of tokens that will be minted

Always look at the latest message from user and try to extract data from it!
Respond with a JSON markdown block containing only the extracted values. All fields are required:
\`\`\`json
{
    "tokenId": string,
    "amount": string
}
\`\`\`

Example response for the input: "Mint 12345 tokens 0.0.5423981", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5423981",
    "amount": 12345
}
\`\`\`

Example response for the input: "Increase supply of token 0.0.5423991 by 100000", the response should be:
\`\`\`json
{
    "tokenId": "0.0.5423991",
    "amount": 100000
}
\`\`\`

Now respond with a JSON markdown block containing only the extracted values.
`;
