/**
 * @function getTrackIds
 * @param {object} setObj LiveAPI Set Object
 * @returns {Array} trackIds
 */
function getTrackIds(setObj) {
    // setObj fails if Preview is off
    if (!setObj) {
        return null;
    }

    const setTracks = setObj.get('tracks');
    const trackIds = setTracks.filter(key => key !== 'id'); // remove 'id' strings from [id,11,id,12,id,13,id,1,id,7,id,8,id,9]

    return trackIds;
}

// exports._getTrackIds = getTrackIds; // eslint-disable-line no-underscore-dangle
