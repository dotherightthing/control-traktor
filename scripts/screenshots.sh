#!/bin/bash

# File: ./scripts/share-release.sh
# Description: Share a release with other users on the same machine
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

screencapture -R 240,145,760,385 ~/"Documents/Websites/control-traktor/screenshots/stream-deck-page-$1.png"
