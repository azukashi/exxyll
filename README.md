<h1 align="center">Exxyll</h1>

[![Banner](docs/assets/banner.webp)](https://exxyll.github.io)

[![License](https://img.shields.io/github/license/gifaldyazkaa/exxyll-origin?style=for-the-badge)](LICENSE) [![Contributors](https://img.shields.io/github/contributors/gifaldyazkaa/exxyll-origin?style=for-the-badge)](https://github.com/gifaldyazkaa/exxyll-origin/graphs/contributors) [![Repo Size](https://img.shields.io/github/repo-size/gifaldyazkaa/exxyll-origin?style=for-the-badge)](#) [![Total Lines](https://img.shields.io/tokei/lines/github/gifaldyazkaa/exxyll-origin?style=for-the-badge)](#) [![Support Server](https://img.shields.io/discord/849130218975526922?color=0099ff&logo=discord&logoColor=4e75e8&style=for-the-badge)](https://discord.gg/j2MfuWySfD) [![Tag Release](https://img.shields.io/github/v/tag/gifaldyazkaa/exxyll-origin?logo=github&style=for-the-badge)](https://github.com/gifaldyazkaa/exxyll-origin/releases) [![Deploy Status](https://img.shields.io/github/workflow/status/gifaldyazkaa/exxyll-origin/Deploy%20to%20Heroku?label=Deploy&logo=github&style=for-the-badge)](.github/workflows/deploys.yml) [![Lint Status](https://img.shields.io/github/workflow/status/gifaldyazkaa/exxyll-origin/Lint%20Checking?label=Lint&logo=github&style=for-the-badge)](.github/workflows/lint.yml)

Multipurpose Discord Bot. Full created with Discord.js Library at v13.2.0

## Scripts

Scripts that available in [package.json](package.json) file.

| Name        | Script               | Description                               |
| ----------- | -------------------- | ----------------------------------------- |
| Start       | `yarn start`         | Run the bot                               |
| Development | `yarn run dev`       | Run the bot in Development Mode           |
| Shard       | `yarn run shard`     | Run and Shard the Bot                     |
| Shard & Dev | `yarn run shard-dev` | Run and Shard the Bot in Development Mode |
| Linters     | `yarn lint`          | Lint the code using ESLint                |

## Getting Started

### Clone this Repository

```bash
$ git clone https://github.com/gifaldyazkaa/exxyll-origin.git
$ cd exxyll-origin
```

### Install all required packages

```bash
$ ./install.sh
```

### Create a Environment Variable

```bash
$ cp .env.example .env
```

### Fill all Required Fields at .env and config.json

- For `.env`

```
TOKEN=your_discord_bot_token
MONGODB=your_mongodb_connection_string
TOPGG_TOKEN=your_topgg_token
OWNERID=your_discord_user_id
PREFIX=your_discord_bot_prefix
```

### Run the bot

Run the bot using available scripts. View the [Available Run Script List](#scripts).

### You should ready to go.

## To-do

Feel free to see at the [docs](docs/todo.md) to see our current to-do for this project!

## License

This Project is Under [Apache License 2.0](https://github.com/gifaldyazkaa/exxyll-rewrite-v13/blob/master/LICENSE) &copy; Gifaldy Azka
