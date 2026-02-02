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

cd          "$INIT_CWD" \
&& echo     "Recreating release folder" \
&& rm -rf    release && mkdir release \
&& echo     "Copying files from ./src to ./release" \
&& mkdir    "release/automator" \
&& mkdir -p "release/clyphx-pro/XTB" \
&& mkdir    "release/bome-midi-translator-pro" \
&& mkdir    "release/live" \
&& mkdir    "release/loopback" \
&& mkdir -p "release/streamdeck-xl/icons/app" \
&& mkdir -p "release/streamdeck-xl/icons/button-creator" \
&& mkdir -p "release/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
&& mkdir -p "release/streamdeck-xl/profiles" \
&& mkdir    "release/traktor" \
&& cp       "./scripts/install.sh"                                             "./release" \
&& cp -r    "./src/automator/Launch Traktor.app"                               "./release/automator" \
&& cp       "./src/bome-midi-translator-pro/stream-deck-traktor.bmtp"          "./release/bome-midi-translator-pro" \
&& cp       "./src/clyphx-pro/XTB/"*                                           "./release/clyphx-pro/XTB" \
&& cp -r    "./src/live/"*                                                     "./release/live" \
&& cp       "./src/loopback/"*.plist                                           "./release/loopback" \
&& cp       "./src/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files/"* "./release/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
&& cp       "./src/streamdeck-xl/profiles/"*                                   "./release/streamdeck-xl/profiles" \
&& cp       "./src/traktor/"*                                                  "./release/traktor" \
&& cp -r    "./submodules/streamdeck-xl/icons/app"                             "./release/streamdeck-xl/icons" \
&& cp -r    "./submodules/streamdeck-xl/icons/button-creator"                  "./release/streamdeck-xl/icons" \
&& cd       "./release" \
&& touch     .gitkeep \
&& echo     "Thanks for using Control Traktor! Please read the installation instructions at https://github.com/dotherightthing/control-traktor/blob/main/INSTALL.md" > ./README.txt
