#!/bin/bash
echo "Building into ./dist"
tsc
cp config.json ./dist/config.json
cp nginx.conf ./dist/nginx.conf
cp test/test.database.sql ./dist/test/test.database.sql
rsync -av --progress ./node_modules ./dist/