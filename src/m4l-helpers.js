/* exported loadbang, renameSelectedTrack, resampleSelectedTrack */

// inlets and outlets
inlets = 1;
outlets = 1;

// private functions and variables
log.local = 1;
getSelectedTrackObj.local = 1;
selfOnMasterTrack.local = 1;

// global functions and variables

/**
 * @function log
 * @see {@link http://compusition.com/writings/js-live-selectedTrackObj-logging}
 */
const log = function () {
    post('------------\n');

    for (let i = 0, len = arguments.length; i < len; i += 1) {
        const message = arguments[i];

        if (message && message.toString) {
            let s = message.toString();

            if (s.indexOf('[object ') >= 0) {
                s = JSON.stringify(message);
            }

            post(s);
        } else if (message === null) {
            post('<null>');
        } else {
            post(message);
        }
    }

    post('\n');
};

// support console.log
const console = { log }; // eslint-disable-line no-unused-vars

/**
 * @function createTrackName
 * @param {string} baseName Base name
 * @param {boolean} timeStamp Whether to output a trailing timestamp (aids debugging)
 * @returns {string} trackName
 */
const createTrackName = function (baseName, timeStamp = true) {
    let timeStampStr = '';
    let trackName = '';

    if (timeStamp) {
        const date = new Date();
        timeStampStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    timeStampStr = timeStamp ? (` (${timeStampStr})`) : '';

    trackName = `[${baseName}]${timeStampStr}`;

    return trackName;
};

/**
 * @function getSelectedTrackObj
 * @summary Checks whether the selected track is an Audio/Midi/Instrument track and not a Return/Master track
 * @returns {object} selectedTrackObj
 */
const getSelectedTrackObj = function () {
    let selectedTrackObj = new LiveAPI('live_set view selected_track');

    if (selectedTrackObj) {
        const sourceTrackCanBeArmed = Boolean(Number(selectedTrackObj.get('can_be_armed')));

        // Excludes return and master tracks
        if (!sourceTrackCanBeArmed) {
            selectedTrackObj = null;
        }
    }

    return selectedTrackObj;
};

/**
 * @function getTrackIds
 * @returns {Array} trackIds
 */
const getTrackIds = function () {
    const setObj = new LiveAPI('live_set');

    // setObj fails if Preview is off
    if (!setObj) {
        return null;
    }

    const setTracks = setObj.get('tracks');
    const trackIds = setTracks.filter(key => key !== 'id'); // remove 'id' strings from [id,11,id,12,id,13,id,1,id,7,id,8,id,9]

    return trackIds;
};

/**
 * @function getTrackInputType
 * @param {string} availableInputTypes Stringified array of objects
 * @param {symbol} sourceTrackName Name of existing track to use as the audio source
 * @returns {object} inputType
 * @see {@link https://github.com/weston-bailey/m4l-plugins/blob/067fd5b9da8350229d1539ae97a2be7f5ed6c19c/max-projects/FFX%20Freq%20Seq%20Proj/code/fsTracker.js#L116}
 */
const getTrackInputType = function (availableInputTypes = [], sourceTrackName = '') {
    const sourceTrackNameStr = String(sourceTrackName);
    let trackInputType;
    let routing = JSON.parse(availableInputTypes); // de-string

    routing.available_input_routing_types.forEach((type) => {
        if (type.display_name === sourceTrackNameStr) {
            trackInputType = type;
        }
    });

    return trackInputType;
};

/**
 * @function insertTrack
 * @param {string} sourceTrackId ID of existing track to insert the new track next to
 * @param {string} trackType Type of new track (audio|midi)
 * @param {string} insertPosition Position of new track relative to existing track (after|before)
 * @returns {object|null} newTrackObj
 * @todo setObj fails if Preview is off - is this expected?
 */
const insertTrack = function (sourceTrackId, trackType = 'audio', insertPosition = 'after') {
    const setObj = new LiveAPI('live_set');

    // setObj fails if Preview is off
    if (!setObj) {
        return null;
    }

    const trackId = Number(sourceTrackId);
    const trackIds = getTrackIds();
    const trackIndex = trackIds.indexOf(trackId);

    const newTrackIndex = (insertPosition === 'before') ? trackIndex : (trackIndex + 1);

    setObj.call(`create_${trackType}_track`, newTrackIndex);

    const newTrackObj = new LiveAPI('live_set tracks ' + newTrackIndex);

    return newTrackObj;
};

/**
 * @function loadbang
 * @summary Executes when the Max patch opens
 */
const loadbang = function () {
    console.log('m4l-helpers initialized.');
};

/**
 * @function renameSelectedTrack
 * @summary Rename the selected track
 * @param {string} trackName Track name
 */
const renameSelectedTrack = function (trackName) {
    console.log('rename track to', trackName);

    const selectedTrackObj = getSelectedTrackObj();

    console.log(typeof selectedTrackObj);

    if (typeof selectedTrackObj !== null) { // eslint-disable-line
        selectedTrackObj.set('name', trackName);
    }
};

/**
 * @function resampleSelectedTrack
 * @summary Resample the selected track
 * @param {string} insertPosition Insert position relative to selected track (before|after)
 */
const resampleSelectedTrack = function (insertPosition) {
    const onMasterTrack = selfOnMasterTrack();

    if (onMasterTrack) {
        const selectedTrackObj = getSelectedTrackObj();

        if (typeof selectedTrackObj !== null) { // eslint-disable-line
            const selectedTrackHasAudioOutput = Boolean(Number(selectedTrackObj.get('has_audio_output')));
            const selectedTrackHasMidiOutput = Boolean(Number(selectedTrackObj.get('has_midi_output')));
            const selectedTrackId = selectedTrackObj.id;
            const selectedTrackColor = String(selectedTrackObj.get('color'));

            let newTrackType;

            if (selectedTrackHasAudioOutput) {
                newTrackType = 'audio';
            } else if (selectedTrackHasMidiOutput) {
                newTrackType = 'midi';
            }

            if (typeof newTrackType !== 'undefined') {
                const newTrackObj = insertTrack(selectedTrackId, newTrackType, insertPosition);

                if (!newTrackObj || (newTrackObj === null)) {
                    return;
                }

                // get selectedTrackName after insertion as an insert to the left will change its numeric suffix
                const selectedTrackName = String(selectedTrackObj.get('name'));
                const newTrackInputRoutingTypes = newTrackObj.get('available_input_routing_types');
                const newTrackName = createTrackName(selectedTrackName, true);
                const newTrackInputType = getTrackInputType(newTrackInputRoutingTypes, selectedTrackName);

                newTrackObj.set('name', newTrackName);
                newTrackObj.set('color', selectedTrackColor);
                newTrackObj.set('input_routing_type', newTrackInputType);
                newTrackObj.set('arm', 1);

                // move focus from new track back to selected track
                const viewObj = new LiveAPI('live_set view');
                viewObj.set('selected_track', 'id', selectedTrackId);
            }
        }
    }
};

/**
 * @function selfOnMasterTrack
 * @summary Checks whether the max device is on the Master track
 * @returns {boolean} isOnMasterTrack
 */
const selfOnMasterTrack = function () {
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
};

/**
 * @function bang
 * @summary Runs automatically when 'live.thisdevice' left outlet is connected to 'js script-name.js' inlet
 */
const bang = function () { // eslint-disable-line no-unused-vars
    // this_device = the Max for Live Device object that contains this JavaScript code
    // in the max object, live.thisdevice determines when the Max Device has completely loaded
    // and sends a bang from its left outlet when the Device is fully initialized, including the Live API).
};
