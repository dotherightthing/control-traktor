#!/bin/bash

# File: ./scripts/release.sh
# Description: Copy relevant files to release folder for release or installation
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
&& echo "Recreating release folder" \
&& rm -rf release && mkdir release \
&& echo "Copying files from ./src to ./release" \
&& mkdir "release/clyphx-pro" \
&& mkdir "release/bome-midi-translator-pro" \
&& mkdir "release/live" \
&& mkdir "release/loopback" \
&& mkdir -p "release/streamdeck-xl/icons/app" \
&& mkdir -p "release/streamdeck-xl/icons/button-creator" \
&& mkdir -p "release/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
&& mkdir -p "release/streamdeck-xl/profiles" \
&& mkdir "release/traktor" \
&& cp "./scripts/install.sh"*                                                                                                "./release" \
&& chmod a+x "./release/install.sh" \
&& cp "./src/clyphx-pro/"*                                                                                                   "./release/clyphx-pro" \
&& cp -r "./src/live/"*                                                                                                      "./release/live" \
&& cp "./src/loopback/"*.plist                                                                                               "./release/loopback" \
&& cp -r "./submodules/streamdeck-xl/icons/app"                                                                              "./release/streamdeck-xl/icons" \
&& cp -r "./submodules/streamdeck-xl/icons/button-creator"                                                                   "./release/streamdeck-xl/icons" \
&& cp "./submodules/streamdeck-xl/profiles/traktor/plugins/streamdeck-midi-plugin/cycle-files/"*                             "./release/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
&& cp "./submodules/streamdeck-xl/profiles/traktor/bome-midi-translator-pro/stream-deck-traktor.bmtp"                        "./release/bome-midi-translator-pro" \
&& cp "./submodules/streamdeck-xl/profiles/traktor/Traktor (CT6).streamDeckProfile"                                          "./release/streamdeck-xl/profiles" \
&& cp "./src/traktor/"*                                                                                                      "./release/traktor" \
&& echo "Please read installation instructions at https://github.com/dotherightthing/control-traktor/blob/main/INSTALL.md." > ./release/README.txt
