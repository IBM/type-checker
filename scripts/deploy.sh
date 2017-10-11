#!/bin/sh

webstore upload --auto-publish --source ./src --extension-id $CHROME_EXTENSION_ID --client-id $CHROME_CLIENT_ID --client-secret $CHROME_CLIENT_SECRET --refresh-token $CHROME_REFRESH_TOKEN
web-ext build -o -s ./src -a ./dist; node ./scripts/firefox_deploy.js