
# `@elizaos/plugin-hedera`

This plugin provides actions and utilities for interacting with Hedera blockchain.

---

## Development

Prepare Eliza according to [README](../../README.md).

Add variables required for `@elizaos/plugin-hedera` :

```env
# accepts ED25519 and ECDSA private keys both DER and HEX encoded
HEDERA_PRIVATE_KEY= 

# accepts hedera account id ex. `0.0.5393196`
HEDERA_ACCOUNT_ID=

# accepts 'mainnet', 'testnet' or 'previewnet'
HEDERA_NETWORK_TYPE=

# accepts 'ECDSA' or 'ED25519'
HEDERA_KEY_TYPE= 
```

Ensure the appropriate environment variables are added for the plugin. If they are correctly configured, the project will run with `@elizaos/plugin-hedera`

Run Eliza

``` bash
  pnpm run dev
```

---

### Using the universal helper Character

The plugin includes a pre-configured character, `universalHelper.character.json`, optimized for Hedera blockchain operations. This character enhances interaction by:

- Handling repeated prompts effectively.

- Better extracting data from user prompts and matching them with proper actions.

To use the character, pass it with the `--characters` flag:

```bash
  pnpm run dev --characters='../characters/universalHelper.character.json'
```

---

### Testing
For testing purposes it is recommended to erase agent's memory on the app start.
This helps you achieve clean environment and erases impact of previously called actions and passed prompts which helps to test new changes during development.
To erase agent's memory and run Eliza with recommended character use following script
```bash
  rm ./agent/data/db.sqlite ; pnpm run dev --character ./characters/universalHelper.character.json 
```
---
## Provider
Plugin implements provider creating instance of `HederaAgentKit` from 
`hedera-agent-kit`. `HederaAgentKit` offers API for interacting with Hedera blockchain and supports executing of operations called from actions.

Provider contains method `get()` that is called after each input given by user. It takes care of refreshing amount of HBAR held by connected account and stored in agent's memory - state.

Connected wallet is considered to be the agent's property. Due to that fact for extracting knowledge about connected wallet's HBAR balance use the following prompt:
1. User input
```
What's yours HBAR balance?
```
2. Response from LLM based on stored context:
```
My current HBAR balance is 999.81307987 HBAR.
```

Note that there is no action required for getting agent's HBAR balance.

---
## Actions

### HBAR Balance

HBAR balance action allows checking HBAR balance of any given valid Hedera wallet.

#### Example Prompts

Below is presented a flow of using HBAR balance action:

1. User input:

```
Show me HBAR balance of wallet 0.0.5423981
```

2. LLM response - action execution:

```
I'll help you get the HBAR balance of wallet 0.0.5423981. (HEDERA_HBAR_BALANCE)
```

3. Action's callback response:

```
Address 0.0.5423981 has balance of 120.76334864 HBAR
```
Currently, EVM wallet addresses are **not supported.** Please pass Hedera addresses (ex. 0.0.5423981).

---

### HTS Balance

HTS balance action allows checking HTS balance of any given valid Hedera wallet.

#### Example Prompts

Below is presented a flow of using HTS balance action:

1. User input:

```
Show me balance of token 0.0.5446064 for wallet 0.0.5446063.
```

2. LLM response - action execution:

```
Calling relevant action to retrieve token balance. Please wait...
```

3. Action's callback response:

```
Address 0.0.5446063 has balance of 10000000 USD Bar (token id: 0.0.5446064)
```
Currently, EVM wallet addresses are **not supported.** Please pass Hedera addresses (ex. 0.0.5423981).

---

### All Tokens Balance

All tokens balance action allows checking all HTS tokens balances of any given valid Hedera wallet.

#### Example Prompts

Below is presented a flow of using All tokens balance action

1. User input:

```
Show me the balances of all HTS tokens for wallet 0.0.5392887
```

2. LLM response - action execution:

```
Calling relevant action to retrieve token balances. Please wait...
```

3. Action's callback response:

```
Address 0.0.5392887 has following token balances:
ExampleToken: 0 EXT
AirDrop Token2: 9990 ADT2
AirDrop Token: 10000 ADT
HIP-904 FT: 0 HIP904FT
Test Token test : 0 HTT
Test Token: 0 HTT
```
Currently, EVM wallet addresses are **not supported.** Please pass Hedera addresses (ex. 0.0.5423981).

---

### Token Holders

Token Holders action allows checking all holders of any given valid token. Token is passed by its token id.
Note that this action takes two parameters:
- **tokenId** - valid token id (ex. 0.0.5446064 ) - required parameter
- **threshold** - integer non-negative number, if passed 0 action will return all addresses associated with the token - optional parameter

If threshold is not passed the action will fetch all wallets associated with given token and with non-zero balances. For example see following section.
#### Example Prompts

Below is presented a flow of using All tokens balance action

##### No threshold passed - only wallets with balances greater then 0
1. User input:

```
Can you show me the token holders for 0.0.5445349
```

2. LLM response - action execution:

```
Calling relevant action to retrieve token holders. Please wait...
```

3. Action's callback response:

```
Token 0.0.5445349 (AirDrop Token2) has following holders:
0.0.5393076: 10 ADT2
0.0.5392887: 9990 ADT2
```

##### Threshold equal 0 passed - all wallets associated with the token
1. User input:

```
Can you show me the token holders for 0.0.5445349 with minimum balance equal 0
```

2. LLM response - action execution:

```
Calling relevant action to retrieve token holders. Please wait...
```

3. Action's callback response:

```
Token 0.0.5445349 (AirDrop Token2) has following holders:
0.0.5393196: 0 ADT2
0.0.5393076: 10 ADT2
0.0.5392887: 9990 ADT2
```

##### Threshold equal 1000 passed - all wallets associated with the token with balances greater or equal 1000
1. User input:

```
Can you show me the token holders for 0.0.5445349 with minimum balance equal 1000
```

2. LLM response - action execution:

```
Calling relevant action to retrieve token holders. Please wait...
```

3. Action's callback response:

```
Token 0.0.5445349 (AirDrop Token2) has following holders:
0.0.5392887: 9990 ADT2
```


Currently, EVM wallet addresses are **not supported.** Please pass Hedera addresses (ex. 0.0.5423981).

---

### Create token

Create token action allows to create a new fungible token on the Hedera network.
Note that this action takes four mandatory parameters:
- **name** - name of the new token to create
- **symbol** - token symbol as uppercase short string
- **decimals** - token decimals as number
- **initialSupply** - initial supply of fungible tokens

#### Example Prompts

Below is presented a flow of using Create Token action

1. User input:

```
Create new token with name MyToken with symbol MTK, 8 decimals and 1000 initial supply
```

2. LLM response - action execution:

```
Calling CREATE_TOKEN action to create a new token with name NotMyToken, symbol NMTK, 8 decimals, and 1000 initial supply. Please wait...
```

3. Action's callback response:

```
Created new token with id: 0.0.5450092
```

---

### Airdrop token

Create token action allows to create a new fungible token on the Hedera network.
Note that this action takes three mandatory parameters:
- **Token id** - id token to airdrop
- **amount** - amount of token in denom unit
- **recipients** - array of account ids of recipients

#### Example Prompts

Below is presented a flow of using Airdrop Token action

1. User input:

```
Airdrop 100 tokens 0.0.5450181 to 0.0.5450165 and 0.0.5450137.
```

2. LLM response - action execution:

```
Calling relevant action. Please wait...
```

3. Action's callback response:

```
Airdrop token successfully executed.
```

Currently, EVM wallet addresses are **not supported.** Please pass Hedera addresses (ex. 0.0.5423981).

---

### Reject Token

Reject token action allows to reject unwanted token received from airdrop on the Hedera network.
Note that this action takes one mandatory parameter:
- **Token id** - id of token to reject

Keep in mind that rejecting a token does not mean disassociating with it.

#### Example Prompts

Below is presented a flow of using Reject Token action

1. User input:

```
Reject token 0.0.5445349.
```

2. LLM response - action execution:

```
Calling relevant action. Please wait...
```

3. Action's callback response:

```
Successfully rejected token: 0.0.5445541. Tx hash: 0.0.5393196@1738313027.916224718
```

Currently, plugin supports rejecting only one token at once.

---

### Associate Token

Associate Token action allows to add selected token to your account.
Note that this action takes one mandatory parameter:
- **Token id** - id of token to associate

#### Example Prompts

Below is presented a flow of using Associate Token action

1. User input:

```
Associate my wallet with token 0.0.5450063.
```

2. LLM response - action execution:

```
Calling relevant action. Please wait...
```

3. Action's callback response:

```
Token 0.0.5450063 has been associated with account.
Transaction hash: f2601d4fdb986f412f7ef1342d9b943fd16ff39029b0f8c054ffb5dffe0b2ef25914da9d2662159fe7883c5f47bed3cc
```

Currently, plugin supports associating with only one token at once.

### Transfer HBAR

Transfer HBAR action allows to transfer HBAR from connected account to given account.
Note that this action takes one mandatory parameter:
- **Token id** - id of token to associate

#### Example Prompts

Below is presented a flow of using Associate Token action

1. User input:

```
Transfer 100 HBAR to 0.0.5392887.
```

2. LLM response - action execution:

```
Calling relevant action. Please wait...
```

3. Action's callback response:

```
HBAR transfer successfully. 0.0.5393196@1738317322.326410854
```

Currently, EVM wallet addresses are **not supported.** Please pass Hedera addresses (ex. 0.0.5423981).

Example of other supported requests for this action:
```
Make a transaction of 4 HBAR to 0.0.5392887.
Send 1 HBAR to account 0.0.5392887.
Transfer exactly 1.1 HBAR to 0.0.5392887.
```

---

## Contribution

The plugin is still in development phase. It heavily depends on `hedera-agent-kit` library that is also in during development.
Consider this code as Proof of Concept that requires further improvements.
Areas of possible improvements:
- adding new actions
- improving reliability of data extraction (templates for each action data extraction are in `./src/templates`)
- unit testing the code

### Running Tests

Test are not implemented yet
