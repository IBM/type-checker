#!/bin/sh

webstore upload --auto-publish --source ./src --extension-id $EXTENSION_ID --client-id $CLIENT_ID --client-secret $CLIENT_SECRET --refresh-token $REFRESH_TOKEN
web-ext build -o -s ./src -a ./dist; node ./scripts/firefox_deploy.js