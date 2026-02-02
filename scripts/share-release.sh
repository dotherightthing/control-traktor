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

cd "$INIT_CWD" \
&& echo     "Copying ./release to /Users/Shared/control-traktor/release" \
&& mkdir -p /Users/Shared/control-traktor \
&& rm -rf   /Users/Shared/control-traktor/release || true \
&& cp -r    ./release /Users/Shared/control-traktor/release \
&& open     "/Users/Shared/control-traktor/release" \
&& echo     "Copy complete. Please ask other users to install from /Users/Shared/control-traktor/release"
