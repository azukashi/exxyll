#!/usr/bin/env bash

# Color variable
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create environment variables file
touch .env
> .env

# Greet user
echo -e "${NC}Welcome to Environment variables setup process for Exxyll!"
echo -e "${NC}You will guided to type some information to fill at .env file"
echo -e "${RED}Please note that what you type here is not uploaded to anywhere or seen by anyone except yourself\n${NC}"

# Ask user for value to fill in env file
read -p "Bot Token: " -e ENV_TOKEN
read -p "Bot Prefix: " -e ENV_PREFIX
read -p "MongoDB String URI: " -e ENV_MONGOOSE
read -p "Owner ID: " -e ENV_OWNERID

# Mix them to one part, and write it to env file
echo -e "TOKEN=\"${ENV_TOKEN}\"\nMONGO=\"${ENV_MONGOOSE}\"\nOWNERID=\"${ENV_OWNERID}\"\nPREFIX=\"${ENV_PREFIX}\"" >> .env
echo -e "\n${GREEN}Setup for .env file is done. Keep it safe at your local folder. ${RED}Never try to commit this file or distributing the file!${NC}"