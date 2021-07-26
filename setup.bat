@REM Setup for getting started without being a heckel.
@REM For Windows / Jendela users only. Cuz the format is batchfile. Not shitfile.
@REM Shitfile is for Linugs / macOS users.
@REM Make sure to have Node.js and Yarn installed. Before you running this Batchfile.
@REM Make sure with your internet too lmao.

@REM Clearing the console
cls
color 2

@REM Checking Node Version
echo "Checking Node.js Version..."
node --version
echo ""

@REM Checking Yarn Version
echo "Checking Yarn Version"
yarn --version
echo ""

@REM Clearing the console
cls
color 3

@REM Install all required dependecies
echo "Installing required dependecies..."
yarn install
echo ""

@REM All process is done right now.
color 2
echo "Process is done. Now you create .env file and run"
echo yarn start
echo ""

@REM Read the docs to get value for .env file
echo "Read repositories readme to know values for .env file!"
echo "https://github.com/gifaldyazkaa/exxyll-origin"