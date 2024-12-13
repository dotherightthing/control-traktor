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

# if $GITHUB_ACTIONS does not exist 'then' script is being run locally
if [ -z "$GITHUB_ACTIONS" ]
then
  cd "$INIT_CWD" \
  && echo "Backing up Ableton patch files" \
  && cp ~/"Music/Ableton/User Library/Presets/Instruments/Drum Rack/CT6 Seq Pads.adg"       "./src/live/Instruments/Drum Rack" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/Instruments/Instrument Rack/CT6 Rack.adg"     "./src/live/Instruments/Instrument Rack" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect/CT6 Params.adv"  "./src/live/MIDI Effects/Max MIDI Effect" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect/CT6 Params.amxd" "./src/live/MIDI Effects/Max MIDI Effect" 2>/dev/null || : \
  && cp ~/"Music/Ableton/User Library/Presets/MIDI Effects/Pitch/CT6 Live to Traktor.ad"v   "./src/live/MIDI Effects/Pitch" 2>/dev/null || : \
  && echo "Backing up Loopback configuration files" \
  && cp ~/"Library/Application Support/Loopback/"*.plist                                    "./src/loopback" \
  && echo "Backup tasks complete"
else
  echo "CI, exiting"
fi
