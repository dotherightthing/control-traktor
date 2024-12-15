#!/bin/bash

# File: ./scripts/install.sh
# Description: Copy files from dist folder or downloaded release folder to system folders
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

if [ -z "$1" ]; then
  echo "Please call this script with 'install.sh 3.11.1', where 3.11.1 is the Traktor version"
fi

# if $GITHUB_ACTIONS does not exist 'then' script is being run locally rather than on CI
if [ -n "$1" ] && [ -z "$GITHUB_ACTIONS" ]
then
  rm -rf ~/"Library/Application Support/control-traktor/" || true \
  && mkdir -p ~/"Library/Application Support/control-traktor/live" \
  && mkdir -p ~/"Library/Application Support/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
  && echo "Installing ClyphX Pro support files" \
  && cp "./clyphx-pro/X-Controls.txt"                                      ~/"nativeKONTROL/ClyphX_Pro" \
  && echo "Installing Live support files" \
  && cp "./live/"*.als                                                     ~/"Library/Application Support/control-traktor/live" \
  && cp "./live/Instruments/Drum Rack/CT6 Seq Pads.adg"                    ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" \
  && cp "./live/Instruments/Instrument Rack/CT6 Rack.adg"                  ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" \
  && cp "./live/MIDI Effects/Max MIDI Effect/CT6 Params.adv"               ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp "./live/MIDI Effects/Max MIDI Effect/CT6 Params.amxd"              ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp "./live/MIDI Effects/Pitch/CT6 Live to Traktor.adv"                ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" \
  && echo "Installing Loopback support files" \
  && cp "./loopback/"*.plist                                               ~/"Library/Application Support/Loopback" \
  && echo "Installing Stream Deck support files" \
  && cp "./streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files/"*.xml ~/"Library/Application Support/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
  && echo "Installing Traktor support files" \
  && cp "./traktor/"*                                                      ~/"Documents/Native Instruments/Traktor $1" \
  && open "./traktor/" \
  && echo "Automatic install tasks complete."
fi
