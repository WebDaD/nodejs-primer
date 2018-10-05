#!/bin/bash
source deploy.config
echo "$VAR_USER"@"$VAR_SERVER":"$VAR_PATH"
echo "Deploying to $VAR_SERVER:$VAR_PATH"
rsync -rhv -delete -e "ssh -o StrictHostKeyChecking=no -i $VAR_PK" --progress ./dist/ $VAR_USER@$VAR_SERVER:$VAR_PATH

if [ "$VAR_PM2RESTART" ]; then
  echo "Restarting $VAR_PM2APPNAME on $VAR_PM2USER@$VAR_SERVER"
  ssh -i $VAR_PK $VAR_PM2USER@$VAR_SERVER "/usr/local/lib/node_modules/pm2/bin/pm2 restart $VAR_PM2APPNAME"
fi