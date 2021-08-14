# Make sure to install node.js & yarn before running this shit script lmao
# If you dont have, Go install it first.

# Clear the screen first.
clear

# Checking for Installed Node.js Version
echo Checking node version...
node --version
echo ""

# Checking for yarn version. Make sure you have yarn installed.
echo Checking yarn version...
yarn --version
echo ""

# Install required dependecies declared in package.json
echo Starting installing required modules...
yarn install
echo ""

# Clear the screen after installing all deps
clear

# Process done. Join support server if you had an error lmao :v
# Yeah bro, run yarn start. don't do npm start. npm is bad
echo Process is done. Now, create .env, customize config.json, and run
echo yarn start
echo ""
echo ""
echo "If you don't know what value you must add at .env, Read the docs at"
echo "https://github.com/gifaldyazkaa/exxyll-origin"
echo ""
echo "Have an issues? Create new one at exxyll-origin repo!"
echo "https://github.com/gifaldyazkaa/exxyll-origin/issues"
echo ""