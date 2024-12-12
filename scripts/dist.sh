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

# if $GITHUB_ACTIONS does not exist 'then' script is being run locally
if [ -z "$GITHUB_ACTIONS" ]
then
  cd "$INIT_CWD" \
  && echo "Compiling JavaScript" \
  && babel ./src/js/*.js -d ./dist \
  && echo "Installing configuration files for ClyphX Pro" \
  && cp ./src/clyphx-pro/* ~/nativeKONTROL/ClyphX_Pro \
  && echo "Installing configuration files for Loopback" \
  && cp ./src/loopback/*.plist ~/Library/Application\ Support/Loopback \
  && echo "Copying files from ./src to ~/Library/Application Support/control-traktor/" \
  && rm -rf ~/Library/Application\ Support/control-traktor/ || true \
  && mkdir -p ~/Library/Application\ Support/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files \
  && cp ./src/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files/*.xml ~/Library/Application\ Support/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files \
  && echo "Copying files from ./src to ./dist" \
  && cp ./src/bome-midi-translator-pro/*.bmtp ./dist \
  && cp ./src/live/* ./dist \
  && cp ./README.md ./dist \
  && cp ./src/streamdeck-xl/profiles/CT6.streamDeckProfile ./dist \
  && cp ./src/traktor/*.png ./dist \
  && cp ./src/traktor/*.tsi ./dist \
  && echo "Dist tasks complete"
else
  cd "$INIT_CWD" \
  && echo "Compiling JavaScript" \
  && babel ./src/js/*.js -d ./dist \
  && echo "Copying files from ./src to ./dist" \
  && cp ./src/bome-midi-translator-pro/*.bmtp ./dist \
  && cp ./src/live/* ./dist \
  && cp ./README.md ./dist \
  && cp ./src/streamdeck-xl/profiles/CT6.streamDeckProfile ./dist \
  && cp ./src/traktor/*.png ./dist \
  && cp ./src/traktor/*.tsi ./dist \
  && echo "Dist tasks complete"
fi
