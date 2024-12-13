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
# TODO compile/copy to dist
# then copy to ~/Library/Application\ Support/control-traktor/live
# then copy to Live User Library etc if not CI
if [ -z "$GITHUB_ACTIONS" ]
then
  cd "$INIT_CWD" \
  && echo "Installing configuration files for ClyphX Pro" \
  && cp "./src/clyphx-pro/"*                                                   ~/"nativeKONTROL/ClyphX_Pro" \
  && echo "Installing configuration files for Loopback" \
  && cp "./src/loopback/"*.plist                                               ~/"Library/Application Support/Loopback" \
  && echo "Installing Ableton Live patches and presets" \
  && cp "./src/live/Instruments/Drum Rack/CT6 Seq Pads.adg"                    ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" \
  && cp "./src/live/Instruments/Instrument Rack/CT6 Rack.adg"                  ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" \
  && cp "./src/live/MIDI Effects/Max MIDI Effect/CT6 Params.adv"               ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp "./src/live/MIDI Effects/Max MIDI Effect/CT6 Params.amxd"              ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp "./src/live/MIDI Effects/Pitch/CT6 Live to Traktor.adv"                ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" \
  && echo "Copying files from ./src to ~/Library/Application Support/control-traktor/" \
  && rm -rf ~/"Library/Application Support/control-traktor/" || true \
  && mkdir -p ~/"Library/Application Support/control-traktor/live" \
  && cp "./src/live/"*.als                                                     ~/"Library/Application Support/control-traktor/live" \
  && mkdir -p ~/"Library/Application Support/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
  && cp "./src/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files/"*.xml ~/"Library/Application Support/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
  && echo "Installing Ableton Live patches and presets" \
  && echo "Copying files from ./src to ./dist" \
  && cp -r "./src/live/"*                                                      "./dist" \
  && cp "./README.md"                                                          "./dist" \
  && cp "./src/streamdeck-xl/profiles/CT6.streamDeckProfile"                   "./dist" \
  && cp "./src/traktor/"*.png                                                  "./dist" \
  && cp "./src/traktor/"*.tsi                                                  "./dist" \
  && echo "Dist tasks complete"
else
  cd "$INIT_CWD" \
  && echo "Copying files from ./src to ./dist" \
  && cp -r "./src/live/"*                                                      "./dist" \
  && cp "./README.md"                                                          "./dist" \
  && cp "./src/streamdeck-xl/profiles/CT6.streamDeckProfile"                   "./dist" \
  && cp "./src/traktor/"*.png                                                  "./dist" \
  && cp "./src/traktor/"*.tsi                                                  "./dist" \
  && echo "Dist tasks complete"
fi
