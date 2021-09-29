<h1 align="center">Exxyll</h1>

[![GitHub](https://img.shields.io/github/license/gifaldyazkaa/exxyll-origin?style=for-the-badge)](LICENSE) ![GitHub contributors](https://img.shields.io/github/contributors/gifaldyazkaa/exxyll-origin?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/gifaldyazkaa/exxyll-origin?style=for-the-badge) ![Viewers Count](https://visitor-badges.glitch.me?username=gifaldyazkaa&repo=exxyll-origin&label=Views&style=for-the-badge&color=%23457BFF&token=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&contentType=svg)

Exxyll is a Multipurpose Discord Bot. Full Created with Discord.js Library at v12.5.3

## Exxyll Original

Original Codebase from Exxyll Discord Bot

## Links

[Invite Exxyll](https://discord.com/oauth2/authorize?client_id=848232775798226996&permissions=1077226614&scope=bot) | [Visit Website](https://exxyll.github.io) | [Exxyll's Top.gg](https://top.gg/bot/848232775798226996) | [Join the Support Server](https://discord.gg/j2MfuWySfD)

## Badges

![Deploy Status](https://github.com/gifaldyazkaa/exxyll-origin/actions/workflows/deploy.yml/badge.svg) ![Code Analysis Status](https://github.com/gifaldyazkaa/exxyll-origin/actions/workflows/analysis.yml/badge.svg) ![Support Server](https://img.shields.io/discord/849130218975526922?logo=discord) ![Exxyll Status](https://top.gg/api/widget/status/848232775798226996.svg) ![Server Counts](https://top.gg/api/widget/servers/848232775798226996.svg)

## Scripts

| Name        | Script           | Description                     |
| ----------- | ---------------- | ------------------------------- |
| Start       | `yarn start`     | Run the bot                     |
| Development | `yarn run dev`   | Run the bot in Development Mode |
| Shard       | `yarn run shard` | Run and Shard the Bot           |
| Linters     | `yarn lint`      | Lint the code using ESLint      |

## Getting Started

### Clone this Repository

```bash
$ git clone https://github.com/gifaldyazkaa/exxyll-origin.git
$ cd exxyll-origin
```

### Install required dependecy

- Linux / macOS user, You can do this

```bash
$ ./install.sh
```

- Windows user, Please install it manually using

```bash
> yarn install
```

> Make sure yarn is installed at your pc. Don't use npm please... or you can use pnpm as alternative.

### Create Environment Variables

- Copy .env.example to .env

```bash
cp .env.example .env
```

### Fill all Required Fields at .env and config.json

- For `.env`

```
TOKEN=your_discord_bot_token
MONGO=your_mongodb_connection_string
TOPGG_TOKEN=your_topgg_token
```

- For `config.json`

```json
{
  "prefix": "your discord bot prefix",
  "ownerId": "your discord user id"
}
```

### Run the Bot

Run the bot using available scripts. View the [Available Run Script List](#scripts).

### You should ready to go.

## License

This project is Under [MIT License](LICENSE). If you want to use this code, please insert a credits. Thanks!s
