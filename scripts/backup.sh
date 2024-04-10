#!/bin/bash

# File: ./scripts/backup.sh
# Description: Backup files that are created and managed externally
#
# Note:
# chmod a+x = Change access permissions of this file, to 'e[x]ecutable' for '[a]ll users'
#
# Example:
# ---
# chmod a+x scripts/*.sh
# ---

# e: exit the script if any statement returns a non-true return value
# v: print shell input lines as they are read (including all comments!)
set -e

cd "$INIT_CWD" \
&& echo "Copying files from ./dist to ./src/patches" \
&& cp ./dist/*.amxd ./src/patches \
&& echo "Copying files from 'Library/Application Support/Loopback' to ./src/Loopback" \
&& cp ~/Library/Application\ Support/Loopback/*.plist ./src/loopback \
&& echo "Backup task complete"
