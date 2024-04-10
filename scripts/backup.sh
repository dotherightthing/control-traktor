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
# suppress both error message and exit code: 2>/dev/null || :
set -e

cd "$INIT_CWD" \
&& echo "Backing up Ableton patch files" \
&& cp ./dist/*.amxd ./src/patches 2>/dev/null || : \
&& echo "Backing up Loopback configuration files" \
&& cp ~/Library/Application\ Support/Loopback/*.plist ./src/loopback \
&& echo "Backup tasks complete"
