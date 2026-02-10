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
  rm -rf      ~/"Documents/control-traktor/" || true \
  && mkdir -p ~/"Documents/control-traktor/automator" \
  && mkdir -p ~/"Documents/control-traktor/bome-midi-translator-pro" \
  && mkdir -p ~/"Documents/control-traktor/live" \
  && mkdir -p ~/"Documents/control-traktor/streamdeck-xl" \
  && mkdir -p ~/"Library/Application Support/Loopback" \
  && mkdir -p ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" \
  && mkdir -p ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" \
  && mkdir -p ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && mkdir -p ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" \
  && mkdir -p ~/"nativeKONTROL/ClyphX_Pro/XTB" \
  && echo     "Installing Automator apps" \
  && cp -r    "./automator/Launch Traktor.app"                      ~/"Documents/control-traktor/automator" \
  && cp -r    "./automator/Wake Stream Deck.app"                    ~/"Documents/control-traktor/automator" \
  && echo     "Installing Bome support files" \
  && cp       "./bome-midi-translator-pro/"*.bmtp                   ~/"Documents/control-traktor/bome-midi-translator-pro" \
  && echo     "Installing ClyphX Pro support files" \
  && cp       "./clyphx-pro/XTB/X-Controls.txt"                     ~/"nativeKONTROL/ClyphX_Pro/XTB" \
  && echo     "Installing Live support files" \
  && cp -r    "./live/CT6 Project"                                  ~/"Documents/control-traktor/live" \
  && cp       "./live/Instruments/Drum Rack/CT6 Seq Pads.adg"       ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" \
  && cp       "./live/Instruments/Instrument Rack/CT6 Rack.adg"     ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" \
  && cp       "./live/MIDI Effects/Max MIDI Effect/CT6 Params.adv"  ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp       "./live/MIDI Effects/Max MIDI Effect/CT6 Params.amxd" ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" \
  && cp       "./live/MIDI Effects/Pitch/CT6 Live to Traktor.adv"   ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" \
  && echo     "Installing Loopback support files" \
  && cp       "./loopback/"*.plist                                  ~/"Library/Application Support/Loopback" \
  && echo     "Installing README file" \
  && cp -r    "./README.txt"                                        ~/"Documents/control-traktor" \
  && echo     "Installing Stream Deck support files" \
  && cp -r    "./streamdeck-xl"                                     ~/"Documents/control-traktor" \
  && echo     "Installing Traktor support files" \
  && cp       "./traktor/"*                                         ~/"Documents/Native Instruments/Traktor $1" \
  && echo     "Creating shortcuts" \
  && cd       ~/"Documents/control-traktor" \
  && ln -s    ~/"Documents/Native Instruments/Traktor $1" \
  && ln -s    ~/"Library/Application Support/Loopback" \
  && ln -s    ~/"nativeKONTROL/ClyphX_Pro/XTB" "ClyphX Pro - XTB" \
  && cd       ~/"Documents/control-traktor/live" \
  && ln -s    ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack" "Live Presets - Drum Rack" \
  && ln -s    ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack" "Live Presets - Instrument Rack" \
  && ln -s    ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect" "Live Presets - Max MIDI Effect" \
  && ln -s    ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch" "Live Presets - Pitch" \
  && open     ~/"Documents/control-traktor" \
  && echo     "Automated install tasks complete, refer README.txt for further instructions." 
fi
