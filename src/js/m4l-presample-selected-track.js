/* exported bang, loadbang, presampleSelectedTrack */
/* global getSelectedTrackObj, getTrackIds, log, selfOnMasterTrack */

const console = {};
const lib = {};

// https://docs.cycling74.com/max8/vignettes/jsrequire
// Unsure how to work with Max search path so using includes rather than modules for now

include('_get-selected-track-obj.js', lib);
include('_get-track-ids.js', lib);
include('_log.js', console);
include('_self-on-master-track.js', lib);
include('_string.polyfill.js');

// const getSelectedTrackObj = require('_getSelectedTrackObj');
// const getTrackIds = require('_getTrackIds');
// const log = require('_log');
// const selfOnMasterTrack = require('_selfOnMasterTrack');

// inlets and outlets
inlets = 1;
outlets = 1;

// local functions and variables
// console.local = 1;
// lib.local = 1;

// global functions and variables

/**
 * @function bang
 * @summary Runs automatically when 'live.thisdevice' left outlet is connected to 'js script-name.js' inlet
 */
function bang() { // eslint-disable-line no-unused-vars
    // this_device = the Max for Live Device object that contains this JavaScript code
    // in the max object, live.thisdevice determines when the Max Device has completely loaded
    // and sends a bang from its left outlet when the Device is fully initialized, including the Live API).
}

/**
 * @function loadbang
 * @summary Executes when the Max patch opens
 */
function loadbang() {
    console.log('m4l-presample-selected-track initialized.'); // eslint-disable-line no-console
}

/**
 * @function presampleSelectedTrack
 * @summary Resample the selected track
 * @param {string} insertPosition Insert position relative to selected track (before|after)
 */
function presampleSelectedTrack(insertPosition) {
    const deviceTrackObj = new LiveAPI('this_device canonical_parent');
    const masterTrackObj = new LiveAPI('live_set master_track');

    const onMasterTrack = lib.selfOnMasterTrack(deviceTrackObj, masterTrackObj);

    if (onMasterTrack) {
        const liveApi = new LiveAPI('live_set view selected_track');
        const selectedTrackObj = lib.getSelectedTrackObj(liveApi);

        // console.log(selectedTrackObj.get('clip_slots')); // eslint-disable-line no-console

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null
        if ((typeof selectedTrackObj === 'object') && (selectedTrackObj !== null)) {
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

            if (typeof newTrackType === 'string') {
                const newTrackObj = insertTrack(selectedTrackId, newTrackType, insertPosition);

                if (!newTrackObj || (newTrackObj === null)) {
                    return;
                }

                // get selectedTrackName after insertion as an insert to the left will change its numeric suffix
                const selectedTrackName = String(selectedTrackObj.get('name'));

                // const selectedTrackClipLength = 0; // TODO

                const newTrackInputRoutingTypes = newTrackObj.get('available_input_routing_types');
                const newTrackName = createTrackName(selectedTrackName, true);
                const newTrackInputType = getTrackInputType(newTrackInputRoutingTypes, selectedTrackName);

                newTrackObj.set('name', newTrackName);
                newTrackObj.set('color', selectedTrackColor);
                newTrackObj.set('input_routing_type', newTrackInputType);
                newTrackObj.set('arm', 1);

                // ...

                // move focus from new track back to selected track
                const viewObj = new LiveAPI('live_set view');
                viewObj.set('selected_track', 'id', selectedTrackId);
            }
        }
    }
}

/**
 * @function createTrackName
 * @param {string} baseName Base name
 * @param {boolean} timeStamp Whether to output a trailing timestamp (aids debugging)
 * @returns {string} trackName
 */
function createTrackName(baseName, timeStamp = true) {
    let timeStampStr = '';
    let trackName = '';

    if (timeStamp) {
        const date = new Date();
        timeStampStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    timeStampStr = timeStamp ? (` (${timeStampStr})`) : '';

    trackName = `[${baseName}]${timeStampStr}`;

    return trackName;
}

/**
 * @function getTrackInputType
 * @param {string} availableInputTypes Stringified array of objects
 * @param {symbol} sourceTrackName Name of existing track to use as the audio source
 * @returns {object} inputType
 * @see {@link https://github.com/weston-bailey/m4l-plugins/blob/067fd5b9da8350229d1539ae97a2be7f5ed6c19c/max-projects/FFX%20Freq%20Seq%20Proj/code/fsTracker.js#L116}
 */
function getTrackInputType(availableInputTypes = [], sourceTrackName = '') {
    const sourceTrackNameStr = String(sourceTrackName);
    let trackInputType;
    let routing = JSON.parse(availableInputTypes); // de-string

    routing.available_input_routing_types.forEach((type) => {
        if (type.display_name === sourceTrackNameStr) {
            trackInputType = type;
        }
    });

    return trackInputType;
}

/**
 * @function insertTrack
 * @param {string} sourceTrackId ID of existing track to insert the new track next to
 * @param {string} trackType Type of new track (audio|midi)
 * @param {string} insertPosition Position of new track relative to existing track (after|before)
 * @returns {object|null} newTrackObj
 * @todo setObj fails if Preview is off - is this expected?
 */
function insertTrack(sourceTrackId, trackType = 'audio', insertPosition = 'after') {
    const setObj = new LiveAPI('live_set');

    // setObj fails if Preview is off
    if (!setObj) {
        return null;
    }

    const trackId = Number(sourceTrackId);
    const trackIds = lib.getTrackIds(setObj);
    const trackIndex = trackIds.indexOf(trackId);

    const newTrackIndex = (insertPosition === 'before') ? trackIndex : (trackIndex + 1);

    setObj.call(`create_${trackType}_track`, newTrackIndex);

    const newTrackObj = new LiveAPI('live_set tracks ' + newTrackIndex);

    return newTrackObj;
}
