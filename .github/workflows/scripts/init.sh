#!/bin/bash
# Install kaskadi-cli
npm i kaskadi-cli
# Init
./node_modules/.bin/kaskadi init action
npm rm kaskadi-cli
# Commit files
git rm .github/workflows/init.yml
git rm .github/workflows/scripts/init.sh
git commit -S -am "Initialized repository with correct naming"
git push
