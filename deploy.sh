#!/bin/bash
# Deploy script for prof.bazzani.info
# Copies the app/ directory to the remote server

set -e

REMOTE="lorenzo_st"
REMOTE_PATH="/home/lorenzo/projects/prof.bazzani.info"
LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)/app"

echo "Deploying to prof.bazzani.info..."
rsync -avz --delete "$LOCAL_PATH/" "$REMOTE:$REMOTE_PATH/"
echo "Done! Site live at https://prof.bazzani.info"
