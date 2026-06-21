#!/bin/bash

# File: ./scripts/resize-stream-deck-for-screenshots.sh
# Description: Resize the Stream Deck window in preparation for screenshots
#
# Note:
# chmod a+x = Change access permissions of this file, to 'e[x]ecutable' for '[a]ll users'
#
# Example:
# ---
# chmod a+x scripts/*.sh
# ---

osascript <<EOF
tell application "System Events"
	set position of first window of application process "Stream Deck" to {0, 0}
	set size of first window of application process "Stream Deck" to {3072 / 2, 1920 / 2}
end tell
EOF
