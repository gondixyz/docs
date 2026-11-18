---
title: "GONDI Market Maker"
description: "A free, open-source desktop app that keeps your NFT bids and listings competitive on GONDI and OpenSea: download it, pick a strategy and set your limits, no code needed."
sidebar:
  label: "Market Maker"
---

The GONDI Market Maker is a free, open-source bot that runs your NFT bids and listings for you, on GONDI and on OpenSea. It prices each bid from the live order book, replaces it when someone outbids you, refreshes it before it expires, and stops when a bid fills or the floor moves.

It is a desktop app for macOS and Windows, so you do not need to write any code. For servers, the same bot runs from the command line. The source code is public at [github.com/gondixyz/market-maker](https://github.com/gondixyz/market-maker).

## Download

| Computer | Download |
| --- | --- |
| Mac with Apple silicon (M1 and later) | [gondi-market-maker-mac-arm64.dmg](https://github.com/gondixyz/market-maker/releases/latest/download/gondi-market-maker-mac-arm64.dmg) |
| Mac with Intel | [gondi-market-maker-mac-x64.dmg](https://github.com/gondixyz/market-maker/releases/latest/download/gondi-market-maker-mac-x64.dmg) |
| Windows | [gondi-market-maker-win-x64.exe](https://github.com/gondixyz/market-maker/releases/latest/download/gondi-market-maker-win-x64.exe) |

These links always fetch the latest version. Earlier versions and the changes in each release are on the [Releases](https://github.com/gondixyz/market-maker/releases) page.

The installers are not yet signed, so your system warns you the first time you open the app:

* **macOS**: drag the app to Applications and open it. At "Apple could not verify", click **Done**, then go to System Settings → Privacy & Security and click **Open Anyway**.
* **Windows**: at "Windows protected your PC", click **More info**, then **Run anyway**.

## What It Does

| | |
| --- | --- |
| Marketplaces | Collection bids on GONDI and on OpenSea; trait bids and listings on GONDI. |
| Bid strategies | Outbid the best bid by a step or a percent, bid a share of the floor or a few steps under it, join a given price level of the bid book, or hold a fixed price. |
| Listing strategies | Undercut the cheapest listing, list at a share of the floor, or at a fixed price; one item or every item the wallet holds in a collection. |
| Limits | A minimum and maximum price per strategy, a cap on everything your bids commit together, how many items or how much value to hold, a stop when the floor moves, and daily and weekly loss limits. |
| Safety | It posts nothing while the order book is crossed, for example under a dust listing, and it picks up its own bids again after a restart. |

## Your Keys and Funds

The bot is non-custodial. Your wallet's key stays on your computer, encrypted by the operating system's secure storage, and never leaves it.

Bids are signed and cancelled off-chain, so they cost no gas. Only approvals, such as letting the marketplace spend your WETH, send a transaction, and the app asks you to confirm each one first.

:::caution
The bot places real bids with the funds of the wallet you give it, and a filled bid is a real purchase. Use a dedicated wallet that holds only the WETH you are willing to bid with, start with small limits, and watch the bot before you leave it running.
:::

## Before You Start

* A wallet holding WETH on Ethereum, plus a little ETH for approval transactions.
* For bids on OpenSea, an [OpenSea API key](https://docs.opensea.io/reference/api-keys). Bids and listings on GONDI need no key.

## Usage Statistics

The desktop app sends anonymous usage statistics, such as how many strategies a run starts with and how long it runs, so the team can see where people get stuck. Nothing is sent until you accept the notice the app shows the first time it opens, and you can turn it off in Settings → Usage statistics. It never sends your wallet address or key, your collections, or your prices. The [project's README](https://github.com/gondixyz/market-maker#usage-statistics) lists every event.

## Running It on a Server

To run the bot unattended on a server, use its command line. The [command line guide](https://github.com/gondixyz/market-maker/blob/main/docs/command-line.md) covers the tasks file, every strategy and limit, and how to try a strategy against a local fork before it touches real funds.

To build your own bot instead, the rest of this section describes the [trading API](/trading-api/getting-started/) the market maker uses.
