#!/bin/bash

# File: ./scripts/install.sh
# Description: Copy files from generated or downloaded release folder to system folders
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
  echo "Please call this script with 'install.sh 3.11.1', where 3.11.1 is the folder title at ~/Documents/Native Instruments/Traktor X.XX.X, NOT the Version shown in Traktor > About Traktor"
fi

# if $GITHUB_ACTIONS does not exist 'then' script is being run locally rather than on CI
if [ -n "$1" ] && [ -z "$GITHUB_ACTIONS" ]
then
  rm -rf ~/"Documents/control-traktor/" || true \
  && mkdir -p ~/"Documents/control-traktor/bome-midi-translator-pro" \
  && mkdir -p ~/"Documents/control-traktor/live" \
  && mkdir -p ~/"Documents/control-traktor/streamdeck-xl/icons" \
  && mkdir -p ~/"Documents/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
  && mkdir -p ~/"nativeKONTROL/ClyphX_Pro" \
  && mkdir -p ~/"Music/Ableton/User Library" ~/"Music/Ableton/User Library/Presets" ~/"Music/Ableton/User Library/Presets/Instruments" ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" \
  && mkdir -p ~/"Music/Ableton/User Library" ~/"Music/Ableton/User Library/Presets" ~/"Music/Ableton/User Library/Presets/MIDI Effects" ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" \
  && mkdir -p ~/"Library/Application Support/Loopback" \
  && echo "Installing Bome support files" \
  && cp "./bome-midi-translator-pro/"*.bmtp                                ~/"Documents/control-traktor/bome-midi-translator-pro" \
  && echo "Installing ClyphX Pro support files" \
  && cp "./clyphx-pro/X-Controls.txt"                                      ~/"nativeKONTROL/ClyphX_Pro" \
  && echo "Installing Live support files" \
  && cp "./live/"*.als                                                     ~/"Documents/control-traktor/live" \
  && cp "./live/Instruments/Drum Rack/CT6 Seq Pads.adg"                    ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" \
  && cp "./live/Instruments/Instrument Rack/CT6 Rack.adg"                  ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" \
  && cp "./live/MIDI Effects/Max MIDI Effect/CT6 Params.adv"               ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp "./live/MIDI Effects/Max MIDI Effect/CT6 Params.amxd"              ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp "./live/MIDI Effects/Pitch/CT6 Live to Traktor.adv"                ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" \
  && echo "Installing Loopback support files" \
  && cp "./loopback/"*.plist                                               ~/"Library/Application Support/Loopback" \
  && echo "Installing Stream Deck support files" \
  && cp -r "./streamdeck-xl"                                               ~/"Documents/control-traktor" \
  && echo "Installing Traktor support files" \
  && cp "./traktor/"*                                                      ~/"Documents/Native Instruments/Traktor $1" \
  && cd ~/"Documents/control-traktor" \
  && ln -s ~/"Documents/Native Instruments/Traktor $1" \
  && ln -s ~/"Library/Application Support/Loopback" \
  && ln -s ~/"nativeKONTROL/ClyphX_Pro" "ClyphX Pro" \
  && cd ~/"Documents/control-traktor/live" \
  && ln -s ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" "Live Presets - Drum Rack" \
  && ln -s ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" "Live Presets - Instrument Rack" \
  && ln -s ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" "Live Presets - Max MIDI Effect" \
  && ln -s ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" "Live Presets - Pitch" \
  && open ~/"Documents/control-traktor" \
  && echo "Automatic install tasks complete."
fi
