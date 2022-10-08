/**
 * @function getSelectedTrackObj
 * @summary Checks whether the selected track is an Audio/Midi/Instrument track and not a Return/Master track
 * @param {object} trackObj LiveAPI Track Object
 * @returns {object} selectedTrackObj
 * @todo "jsliveapi: 'available_input_routing_types' not available on return tracks" - try..catch doesn't help
 * @todo "jsliveapi: 'available_input_routing_types' not available on master track" - try..catch doesn't help
 */
function getSelectedTrackObj(trackObj) {
    const selectedTrackObj = trackObj;

    if (selectedTrackObj) {
        let inputOptions = selectedTrackObj.get('available_input_routing_types');

        // Excludes return and master tracks
        if (typeof inputOptions !== 'object') {
            selectedTrackObj = null;
        }
    }

    return selectedTrackObj;
}

// exports._getSelectedTrackObj = getSelectedTrackObj; // eslint-disable-line no-underscore-dangle
