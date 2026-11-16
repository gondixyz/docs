---
title: "MCP Server"
description: "Connect Claude, ChatGPT, Cursor, VS Code or any MCP client to GONDI's read-only MCP server and ask about NFT lending rates, offers, collections and lenders."
---

GONDI runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that gives AI assistants live GONDI lending data: market rates, the collections borrowers take loans against, active loan offers, top lenders and their returns. Add it to your assistant once, then ask questions in plain language. It only reads data: it needs no API key and no wallet, and it cannot sign or send anything.

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

| Tool | What it answers |
| --- | --- |
| `get_lending_market_overview` | The whole lending market in USD: open principal, interest paid to and accruing for lenders, and the APR range of new loans over rolling windows. |
| `get_supported_markets` | The chains and principal currencies GONDI lends in, the loan contract to approve on each chain, the accepted offer durations and the protocol fee. |
| `get_lending_guide` | How lending on GONDI works, step by step, with its risks and the units the tools answer in. |
| `list_lending_opportunities` | Collections borrowers take loans against, ranked by open principal, loan count, offer count or loan volume, with repayment rate and floor price. |
| `get_collection_lending_stats` | One collection's floor price, open loans, repayment rate, and the principal, APR and remaining-time ranges of its open loans in one currency. |
| `list_loan_offers` | Active public loan offers, filterable by collection, chain, currency and minimum APR, sorted by APR, principal, duration or date. |
| `get_top_lenders` | The leading lenders over the last 30, 90 or 180 days by earnings, net APR, open principal or lowest default rate. |
| `get_lender_returns` | One wallet's lending record in one currency: principal lent, realised profit, net APR, defaults and the interest its open loans are still due. |

**Units**: token amounts are whole tokens next to their currency symbol (`1.5 WETH`, not wei), USD values are dollars (empty when a currency's rate is unavailable), rates and APRs are percent, and durations are days.

## Example Questions

* "What APR can I earn lending against Pudgy Penguins on GONDI?"
* "Which collections are best to lend against?"
* "Show the highest-APR loan offers."
* "Who are the top lenders this month and what do they earn?"
* "What terms should I offer to lend 10 WETH on Milady?"
* "How does GONDI lending work and what are the risks?"

## Limits

* **Read-only**: no tool holds keys or sends transactions. To act on what you learn (sign in, approve the loan contract, sign or cancel offers), use the [`gondi`](https://www.npmjs.com/package/gondi) SDK with your own wallet, as described in [Lend with an Agent](/gondi-v3/lend-with-an-agent/).
* **Live data**: answers come from the same public data as the GraphQL API at `https://api.gondi.xyz/graphql`, at the moment of the call.
* **Rate limits**: requests are rate-limited per IP address.
* **Not financial advice**: the assistant's suggestions are based on market data only. Lending against NFTs carries the risks listed under [Lend with an Agent](/gondi-v3/lend-with-an-agent/#risks-and-fees).
