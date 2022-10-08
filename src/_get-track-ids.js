/**
 * @function getTrackIds
 * @returns {Array} trackIds
 */
function getTrackIds() {
    const setObj = new LiveAPI('live_set');

    // setObj fails if Preview is off
    if (!setObj) {
        return null;
    }

    const setTracks = setObj.get('tracks');
    const trackIds = setTracks.filter(key => key !== 'id'); // remove 'id' strings from [id,11,id,12,id,13,id,1,id,7,id,8,id,9]

    return trackIds;
}

exports._getTrackIds = getTrackIds; // eslint-disable-line no-underscore-dangle
