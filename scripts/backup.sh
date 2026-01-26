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

# if $GITHUB_ACTIONS does not exist 'then' script is being run locally rather than on CI
if [ -z "$GITHUB_ACTIONS" ]
then
  cd "$INIT_CWD" \
  && echo "Backing up ClyphX Pro support files" \
  && cp ~/"nativeKONTROL/ClyphX_Pro/X-Controls.txt"                                                   "./src/clyphx-pro" \
  && echo "Backing up Live support files" \
  && cp ~/"Documents/control-traktor/live/CT6.als"                                                    "./src/live" \
  && cp ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack/CT6 Seq Pads.adg"                 "./src/live/Instruments/Drum Rack" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack/CT6 Rack.adg"               "./src/live/Instruments/Instrument Rack" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect/CT6 Params.adv"            "./src/live/MIDI Effects/Max MIDI Effect" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect/CT6 Params.amxd"           "./src/live/MIDI Effects/Max MIDI Effect" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch/CT6 Live to Traktor.adv"             "./src/live/MIDI Effects/Pitch" 2>/dev/null || : \
  && echo "Backing up Loopback support files" \
  && cp ~/"Library/Application Support/Loopback/"*.plist                                              "./src/loopback" \
  && echo "Backing up Stream Deck support files" \
  && cp ~/"Documents/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files/"*.xml  "./src/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files" \
  && echo "Backing up Traktor support files" \
  && cp ~/"Documents/Native Instruments/Traktor 3.11.1/CT6 - App Export.tsi"                          "./src/traktor/" \
  && cp ~/"Documents/Native Instruments/Traktor 3.11.1/CT6 - Deck A.tsi"                              "./src/traktor/" \
  && cp ~/"Documents/Native Instruments/Traktor 3.11.1/CT6 - Deck B.tsi"                              "./src/traktor/" \
  && cp ~/"Documents/Native Instruments/Traktor 3.11.1/CT6 - Global.tsi"                              "./src/traktor/" \
  && cp ~/"Documents/Native Instruments/Traktor 3.11.1/CT6 - Korg nanoKEY2.tsi"                       "./src/traktor/" \
  && cp ~/"Documents/Native Instruments/Traktor 3.11.1/CT6 - S8.tsi"                                  "./src/traktor/" \
  && cp ~/"Documents/Native Instruments/Traktor 3.11.1/CT6 - Streamdeck XL.tsi"                       "./src/traktor/" \
  && echo "Backup tasks complete"
fi
