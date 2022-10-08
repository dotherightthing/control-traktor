/**
 * @function selfOnMasterTrack
 * @summary Checks whether the max device is on the Master track
 * @param deviceTrackObj LiveAPI Device Track Object
 * @param masterTrackObj LiveAPI Master Track Object
 * @returns {boolean} isOnMasterTrack
 */
function selfOnMasterTrack(deviceTrackObj, masterTrackObj) {
    let isOnMasterTrack = false;

    const deviceTrackName = String(deviceTrackObj.get('name'));
    const hostTrackObj = masterTrackObj;

    if (hostTrackObj) {
        const hostTrackName = String(hostTrackObj.get('name'));

        if (hostTrackName === deviceTrackName) {
            isOnMasterTrack = true;
        }
    }

    return isOnMasterTrack;
}

// exports._selfOnMasterTrack = selfOnMasterTrack; // eslint-disable-line no-underscore-dangle
