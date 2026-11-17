---
title: "MCP Server"
description: "Connect Claude, ChatGPT, Cursor, VS Code or any MCP client to GONDI's read-only MCP server and ask about NFT prices, listings and bids, loan offers, your loans, what you can borrow and lender returns."
---

GONDI is an NFT marketplace with peer-to-peer lending built in: on Ethereum, Hyperliquid (HyperEVM) and Robinhood Chain you buy, sell, list and bid on NFTs, and borrow or lend against them. GONDI runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that gives AI assistants live GONDI data: floor prices, top bids and the cheapest listings, loan offers and lending rates, a borrower's open loans and what their NFTs can borrow, top lenders and their returns. Add it to your assistant once, then ask questions in plain language. It only reads data: it needs no API key and no wallet, and it cannot sign or send anything.

| | |
| --- | --- |
| Endpoint | `https://api.gondi.xyz/mcp` |
| Transport | Streamable HTTP (stateless, JSON responses) |
| Authentication | None |
| MCP Registry | `xyz.gondi/mcp` |

## Setup

### Claude (claude.ai and Claude Desktop)

1. Open **Customize → Connectors**.
2. Select **+ Add**, then **Add custom connector**.
3. Name it `GONDI`, enter `https://api.gondi.xyz/mcp` as the URL and select **Continue**.
4. Choose **No sign in** under Authentication, then **Add**.

In a chat, turn it on from the **+** button → **Connectors**. On Team and Enterprise plans an owner adds the connector under **Organization settings → Connectors** first.

### Claude Code

```bash
claude mcp add --transport http gondi https://api.gondi.xyz/mcp
```

### Cursor

Add the server to `~/.cursor/mcp.json` (every project) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "gondi": {
      "url": "https://api.gondi.xyz/mcp"
    }
  }
}
```

### VS Code

Run **MCP: Add Server** from the Command Palette, choose **HTTP** and enter `https://api.gondi.xyz/mcp`. Or add it to `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "gondi": {
      "type": "http",
      "url": "https://api.gondi.xyz/mcp"
    }
  }
}
```

### ChatGPT

In ChatGPT on the web, open **Plugins**, select **+** and **Add custom MCP server**. Enter `https://api.gondi.xyz/mcp` as the server URL, choose **No authentication**, accept the warning and create it, then install it before using it in a chat. Custom MCP servers depend on your ChatGPT plan and, in a workspace, on what its admins allow.

### Other Clients

Any client that supports remote MCP servers over streamable HTTP works: point it at `https://api.gondi.xyz/mcp` with no authentication.

## Tools

The server identifies itself as `gondi` ("GONDI") and offers 14 tools. Tools that take a slug want GONDI's slug for the collection or artist: the assistant gets it from `search_gondi` rather than guessing it. Every chain argument is one of `ethereum`, `hyperliquid` or `robinhood`, and every currency argument one of `WETH`, `USDC`, `WHYPE`, `HUSDC`, `RWETH` or `USDG`. List tools take a `limit` of 1 to 25 rows (10 by default).

### Search

| Tool | What it answers | Key arguments |
| --- | --- | --- |
| `search_gondi` | Collections, artists, NFTs and users matching a name, each with its slug or address, its chain and its GONDI page. Turns a name into the slug the other tools take. | `query`: a name or part of one, a slug, a token id, an ENS name or an address; `limit`: results per kind, 1 to 15 (5 by default). |

### Market

| Tool | What it answers | Key arguments |
| --- | --- | --- |
| `get_collection_market` | A collection's floor price and top collection bid, each in its currency and in USD. | `slug`. |
| `get_nft_market` | One NFT's listing price, top bid, last sale, estimated value, and whether it is collateral in an open loan. | `collection_slug`, `token_id` (decimal). |
| `list_cheapest_for_sale` | The cheapest NFTs for sale from a collection or by an artist, cheapest first, with each listing's price, the marketplace it is listed on and the page to buy it. A collection's list includes its wrapped versions and the vaults holding its NFTs, as its GONDI page does. | Exactly one of `collection_slug` or `artist_slug`. |

### Lending

| Tool | What it answers | Key arguments |
| --- | --- | --- |
| `get_lending_market_overview` | The whole lending market in USD: open principal, interest paid to and accruing for lenders, and per rolling window the principal originated and the APR quartiles of new loans. | None. |
| `get_supported_markets` | The chains and principal currencies GONDI lends in with their decimals, the loan contract to approve on each chain, the accepted offer durations and the protocol fee on interest. | None. |
| `get_lending_guide` | How lending on GONDI works, step by step, with its risks and the units the tools answer in. | None. |
| `list_lending_opportunities` | Collections borrowers take loans against, with open loans and principal, repayment rate, floor price and the offers lenders already hold. A collection and its wrapped forms count once, under the collection they wrap. | `sort_by`: `TOTAL_OUTSTANDING_PRINCIPAL` (default), `LOAN_COUNT`, `OFFER_COUNT` or `TOTAL_LOAN_VOLUME`; `chain`; `currency` (counts offers in that currency only). |
| `get_collection_lending_stats` | One collection's floor price, open loans, repayment rate, and the principal, APR and remaining-time ranges of its open loans in one currency, with its wrapped forms counted once. Use it to price an offer. | `slug`; `currency` (the chain's wrapped native token by default). |
| `list_loan_offers` | Active public loan offers: principal, APR, duration, and the collection or NFT each is for. These are the terms a new offer competes with, and the cheapest loan a borrower can take. | `collection_slug`, `chain`, `currency`, `min_apr_percent`; `sort_by`: `APR_BPS` (default), `PRINCIPAL_AMOUNT`, `AVAILABLE_PRINCIPAL_AMOUNT`, `DURATION` or `CREATED_DATE`; `order`: `DESC` (default) or `ASC`, so `APR_BPS` with `ASC` gives the cheapest loan first. |
| `get_top_lenders` | The leading lenders over a rolling period, with their open principal, earnings, net APR and default rate. | `metric`: `EARNINGS`, `NET_EAPR`, `OUTSTANDING_PRINCIPAL` or `LOWEST_DEFAULT_RATE`; `period`: `LAST_30_DAYS`, `LAST_90_DAYS` (default) or `LAST_180_DAYS`; `currency` (every currency in USD by default). |
| `get_lender_returns` | One lender's record per currency: principal lent, realised net profit, weighted net APR, defaulted principal, and the open positions with the interest they are still due. | `wallet`: an address, a GONDI username or an ENS name; `currency` (every currency the wallet lent in by default). The former `wallet_address` argument still works but is deprecated. |

### Borrowing

| Tool | What it answers | Key arguments |
| --- | --- | --- |
| `list_borrower_loans` | A borrower's open loans: the NFT, principal, APR, start and due dates, days left, the repayment due at expiry, whether the loan is in its end lockup, the renegotiation offers waiting on it and the best market offer on its NFT, plus the page to repay, renegotiate or refinance. | `wallet`: an address, a GONDI username or an ENS name; `expiring_within_days` (overdue loans included); `sort_by`: `DUE_DATE` (soonest first, default) or `REFINANCE_SAVING` (largest APR cut on offer first). |
| `list_borrowing_opportunities` | What a wallet can borrow against right now: the NFTs it holds in its wallet, stash or vaults and not already in a loan, each with the largest offer it can take today (net principal, APR, duration, origination fee, loan-to-floor and expiry), its collection floor and the page to borrow. | `wallet`: an address, a GONDI username or an ENS name; `currency`; `sort_by`: `PRINCIPAL` (most you can borrow first, default) or `APR` (cheapest first). |

**Units**: token amounts are whole tokens next to their currency symbol (`1.5 WETH`, not wei), USD values are dollars (empty when a currency's rate is unavailable), rates and APRs are percent, and durations are days.

## Example Questions

* "What's the floor and the top bid on Pudgy Penguins?"
* "What's the top bid on Milady #1234, and what is it listed for?"
* "Show me the five cheapest CryptoPunks for sale."
* "What's the cheapest piece for sale by XCOPY?"
* "Which of my loans expire this week?" (give your address, GONDI username or ENS name)
* "Which of my loans should I renegotiate?"
* "What can I borrow against the NFTs in vitalik.eth?"
* "What's the cheapest loan I can take on Azuki?"
* "What APR can I earn lending against Pudgy Penguins?"
* "Which collections are best to lend against?"
* "Who are the top lenders this month and what do they earn?"
* "What are mishark's lending returns?"
* "How does GONDI lending work and what are the risks?"

## Limits

* **Read-only**: no tool holds keys, signs or sends transactions. Answers link to the page on [gondi.xyz](https://www.gondi.xyz) where you act on them: buy, bid, borrow, repay, renegotiate or refinance with your own wallet. To lend from a script (sign in, approve the loan contract, sign or cancel offers), use the [`gondi`](https://www.npmjs.com/package/gondi) SDK with your own wallet, as described in [Lend with an Agent](/gondi-v3/lend-with-an-agent/).
* **Live data**: answers come from the same public data as the GraphQL API at `https://api.gondi.xyz/graphql`, at the moment of the call.
* **Rate limits**: requests are rate-limited per IP address.
* **Not financial advice**: the assistant's suggestions are based on market data only. Buying, borrowing and lending against NFTs carry risk: a loan not repaid by its expiry defaults and the borrower loses the NFT, and lenders face the risks listed under [Lend with an Agent](/gondi-v3/lend-with-an-agent/#risks-and-fees).
