// inlets and outlets
inlets = 1;
outlets = 1;

// global variables and arrays

/**
 * @function log
 * @see {@link http://compusition.com/writings/js-live-sourceTrackObj-logging}
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
 * @function insertTrack
 * @param {string} sourceTrackId ID of existing track to insert the new track next to
 * @param {string} trackType Type of new track (audio|midi)
 * @param {string} insertPosition Position of new track relative to existing track (after|before)
 * @returns {object} newTrackObj
 * @todo setObj fails if Preview is off - is this expected?
 */
const insertTrack = function (sourceTrackId, trackType = 'audio', insertPosition = 'after') {
    const setObj = new LiveAPI('live_set');

    if (!setObj) {
        console.log('setObj not found');
    }

    const trackId = parseInt(sourceTrackId, 10); // convert string id to number
    const trackIds = setObj.get('tracks').filter(key => key !== 'id'); // remove 'id' strings from [id,11,id,12,id,13,id,1,id,7,id,8,id,9]
    const trackIndex = trackIds.indexOf(trackId);
    const newTrackIndex = (insertPosition === 'before') ? trackIndex : (trackIndex + 1);

    setObj.call(`create_${trackType}_track`, newTrackIndex);

    const newTrackObj = new LiveAPI('live_set tracks ' + newTrackIndex);

    return newTrackObj;
};

/**
 * @function createTrackName
 * @param {string} baseName Base name
 * @param {string} suffix Suffix
 * @param {boolean} timeStamp Whether to output a timestamp after the suffix
 * @returns {string} trackName
 */
const createTrackName = function (baseName, suffix = '', timeStamp = true) {
    let suffixStr = '';
    let timeStampStr = '';
    let trackName = '';

    if (timeStamp) {
        const date = new Date();
        timeStampStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    suffixStr = (suffix !== '') ? (` ${suffix}`) : '';
    timeStampStr = timeStamp ? (` ${timeStampStr}`) : '';

    trackName = `${baseName}${suffixStr}${timeStampStr}`;

    return trackName;
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
 * @function bang
 * @summary Runs automatically when 'live.thisdevice' left outlet is connected to 'js this_file_name.js' inlet
 */
const bang = function () { // eslint-disable-line no-unused-vars
    // this_device = the Max for Live Device object that contains this JavaScript code
    const deviceTrackObj = new LiveAPI('this_device canonical_parent');

    if (!deviceTrackObj) {
        return;
    }

    // Plugin must be loaded on Master track

    const deviceTrackName = String(deviceTrackObj.get('name'));
    const hostTrackObj = new LiveAPI('live_set master_track');

    if (!hostTrackObj) {
        return;
    }

    const hostTrackName = String(hostTrackObj.get('name'));

    if (hostTrackName === deviceTrackName) {
        const sourceTrackObj = new LiveAPI('live_set view selected_track');

        if (!sourceTrackObj) {
            return;
        }

        const sourceTrackId = sourceTrackObj.id;
        const sourceTrackName = String(sourceTrackObj.get('name'));

        // Master track can't be renamed
        if (sourceTrackName === 'Master') {
            return;
        }

        const sourceTrackHasAudioOutput = Boolean(Number(sourceTrackObj.get('has_audio_output')));
        const sourceTrackHasMidiOutput = Boolean(Number(sourceTrackObj.get('has_midi_output')));
        let newTrackType = null;

        if (sourceTrackHasAudioOutput) {
            newTrackType = 'audio';
        } else if (sourceTrackHasMidiOutput) {
            newTrackType = 'midi';
        }

        if (newTrackType !== null) {
            const newTrackObj = insertTrack(sourceTrackId, newTrackType, 'after');

            if (!newTrackObj) {
                return;
            }

            const newTrackInputRoutingTypes = newTrackObj.get('available_input_routing_types');
            const newTrackName = createTrackName(sourceTrackName, 'rs', true);
            const newTrackInputType = getTrackInputType(newTrackInputRoutingTypes, sourceTrackName);

            newTrackObj.set('name', newTrackName);
            newTrackObj.set('input_routing_type', newTrackInputType);
            newTrackObj.set('arm', 1);
        }
    }

    // - to here is the equivalent of ClyphX's INSAUDIO/INSMIDI:
    //
    // Insert an Audio or MIDI Track to the right of the selected Track that will be armed and routed from the selected Track.
    // This will not perform an insertion if the selected Track is not the correct type.
    // For example, if the selected Track doesn't have Audio output, INSAUDIO will do nothing.
};
