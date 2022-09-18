/**
 * http://compusition.com/writings/js-live-sourceTrackObj-logging
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
}; // allow console.log

console = { log };

/**
 * @function newTrack
 * @param {string} sourceTrackId ID of existing track to insert the new track next to
 * @param {string} trackType Type of new track (audio|midi)
 * @param {string} insertPosition Position of new track relative to existing track (after|before)
 * @returns {object} newTrackObj
 */
const newTrack = function (sourceTrackId, trackType = 'audio', insertPosition = 'after') {
    const setObj = new LiveAPI('live_set');
    const trackId = parseInt(sourceTrackId, 10); // convert string id to number
    const trackIds = setObj.get('tracks').filter(key => key !== 'id'); // remove 'id' strings from [id,11,id,12,id,13,id,1,id,7,id,8,id,9]
    const trackIndex = trackIds.indexOf(trackId);
    const newTrackIndex = (insertPosition === 'before') ? trackIndex : (trackIndex + 1);

    setObj.call(`create_${trackType}_track`, newTrackIndex);

    const newTrackObj = new LiveAPI('live_set tracks ' + newTrackIndex);

    return newTrackObj;
};

/**
 * @function newTrackName
 * @param {string} baseName Base name
 * @param {string} suffix Suffix
 * @param {boolean} timeStamp Whether to output a timestamp after the suffix
 * @returns {string} trackName
 */
const newTrackName = function (baseName, suffix = '', timeStamp = true) {
    let suffixStr = '';
    let timeStampStr = '';
    let trackName = '';

    if (timeStamp) {
        const date = new Date();
        timeStampStr = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    }

    suffixStr = (suffix !== '') ? (` ${suffix}`) : '';
    timeStampStr = timeStamp ? (` ${timeStampStr}`) : '';

    trackName = `${baseName}${suffixStr}${timeStampStr}`;

    return trackName;
};

/**
 * @function bang
 * @summary Runs automatically when 'live.thisdevice' left outlet is connected to 'js this_file_name.js' inlet
 */
const bang = function () { // eslint-disable-line no-unused-vars
    // paths
    // https://docs.cycling74.com/max8/vignettes/live_object_model
    // this_device = the Max for Live Device object that contains our JavaScript code
    var sourceTrackObj = new LiveAPI('this_device canonical_parent'); // console.log('path:', sourceTrackObj.path);
    // console.log('id:', sourceTrackObj.id);
    // console.log(setObj.info);
    // var sourceTrackObjChildren = new LiveAPI('this_device canonical_parent devices 0');
    // var p = sourceTrackObj.get('canonical_parent');
    // console.log(p); // id,4

    const newTrackObj = newTrack(sourceTrackObj.id, 'audio', 'after'); // var routing = sourceTrackObj.get('available_input_routing_types');
    const trackName = newTrackName(sourceTrackObj.get('name'), 'rs', true);

    newTrackObj.set('name', trackName);

    // console.log(available_input_routing_types);
    // ==> js: {'available_input_routing_types': [{'display_name': 'Resampling', 'identifier': 0}, {'display_name': '3-Audio', 'identifier': 1}, {'display_name': 'A-Reverb', 'identifier': 2}, {'display_name': 'B-Delay', 'identifier': 3}, {'display_name': 'Master', 'identifier': 4}, {'display_name': 'No Input', 'identifier': 5}]}
    // https://github.com/weston-bailey/m4l-plugins/blob/067fd5b9da8350229d1539ae97a2be7f5ed6c19c/max-projects/FFX%20Freq%20Seq%20Proj/code/fsTracker.js#L116
    // routing = JSON.parse(routing); // de-string
    // var type = sourceTrackObj.get('input_routing_type');
    // for (var i = 0; i < routing.available_input_routing_types.length; i++){ //iterate and look for match
    //   var obj = routing.available_input_routing_types[i];
    //   if (obj.display_name == trackName) {
    //     type = routing.available_input_routing_types[i];
    //   }
    // }
    // sourceTrackObj.set('input_routing_type', type);
};
