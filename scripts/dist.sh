#!/bin/bash

# File: ./scripts/dist.sh
# Description: Copy relevant files to the dist folder
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
&& echo "Compiling JavaScript" \
&& babel ./src/js/*.js -d ./dist \
&& echo "Installing configuration files for ClyphX Pro" \
&& cp ./src/clyphx-pro/* ~/nativeKONTROL/ClyphX_Pro \
&& echo "Installing configuration files for Loopback" \
&& cp ./src/loopback/*.plist ~/Library/Application\ Support/Loopback \
&& echo "Copying files from ./src to ./dist" \
&& cp ./src/patches/*.amxd ./dist \
&& cp ./src/presets/*.adg ./dist \
&& cp ./README.md ./dist \
&& cp ./src/sets/*.als ./dist \
&& cp ./src/streamdeck-xl/profiles/Traktor.streamDeckProfile ./dist \
&& cp ./src/traktor/*.png ./dist \
&& cp ./src/traktor/*.tsi ./dist \
&& echo "Dist tasks complete"
