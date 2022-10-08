/**
 * @function selfOnMasterTrack
 * @summary Checks whether the max device is on the Master track
 * @returns {boolean} isOnMasterTrack
 */
function selfOnMasterTrack() {
    let isOnMasterTrack = false;

    const deviceTrackObj = new LiveAPI('this_device canonical_parent');
    const deviceTrackName = String(deviceTrackObj.get('name'));
    const hostTrackObj = new LiveAPI('live_set master_track');

    if (hostTrackObj) {
        const hostTrackName = String(hostTrackObj.get('name'));

        if (hostTrackName === deviceTrackName) {
            isOnMasterTrack = true;
        }
    }

    return isOnMasterTrack;
}

exports._selfOnMasterTrack = selfOnMasterTrack; // eslint-disable-line no-underscore-dangle
