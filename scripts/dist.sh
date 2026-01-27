#!/bin/bash

# File: ./scripts/dist.sh
# Description: Copy relevant files to dist folder for release
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
&& echo "Recreating dist folder" \
&& rm -rf dist && mkdir dist \
&& echo "Copying files from ./src to ./dist" \
&& mkdir "dist/clyphx-pro" \
&& mkdir "dist/bome-midi-translator-pro" \
&& mkdir "dist/live" \
&& mkdir "dist/loopback" \
&& mkdir -p "dist/streamdeck-xl/icons/app" \
&& mkdir -p "dist/streamdeck-xl/icons/button-creator" \
&& mkdir -p "dist/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
&& mkdir -p "dist/streamdeck-xl/profiles" \
&& mkdir "dist/traktor" \
&& cp "./scripts/install.sh"*                                                                                                "./dist" \
&& cp "./src/clyphx-pro/"*                                                                                                   "./dist/clyphx-pro" \
&& cp -r "./src/live/"*                                                                                                      "./dist/live" \
&& cp "./src/loopback/"*.plist                                                                                               "./dist/loopback" \
&& cp -r "./submodules/streamdeck-xl/icons/app"                                                                              "./dist/streamdeck-xl/icons" \
&& cp -r "./submodules/streamdeck-xl/icons/button-creator"                                                                   "./dist/streamdeck-xl/icons" \
&& cp "./submodules/streamdeck-xl/profiles/traktor/plugins/streamdeck-midi-plugin/cycle-files/"*                             "./dist/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
&& cp "./submodules/streamdeck-xl/profiles/traktor/bome-midi-translator-pro/stream-deck-traktor.bmtp"                        "./dist/bome-midi-translator-pro" \
&& cp "./submodules/streamdeck-xl/profiles/traktor/Traktor (CT6).streamDeckProfile"                                          "./dist/streamdeck-xl/profiles" \
&& cp "./src/traktor/"*                                                                                                      "./dist/traktor" \
&& echo "Please read installation instructions at https://github.com/dotherightthing/control-traktor/blob/main/INSTALL.md." > ./dist/README.txt \
&& echo "Dist tasks complete"
