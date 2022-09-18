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
 * @function addTrack
 * @param {string} sourceTrackId
 * @param {string} sourceTrackName
 * @param {string} trackType audio|midi
 * @param {string} insertPosition after|before
 */

const addTrack = function (sourceTrackId, sourceTrackName, trackType, insertPosition) {
    const setObj = new LiveAPI('live_set');
    const trackId = parseInt(sourceTrackId, 10); // convert string id to number

    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0');
    let tracks = setObj.get('tracks');
    let newTrackIndex;

    tracks = tracks.filter(key => key !== 'id'); // remove 'id' strings from [id,11,id,12,id,13,id,1,id,7,id,8,id,9]

    const trackIndex = tracks.indexOf(trackId);

    if (insertPosition === 'before') {
        // before
        newTrackIndex = trackIndex;
    } else {
        // after
        newTrackIndex = trackIndex + 1;
    }

    if (trackType === 'midi') {
        // midi
        setObj.call('create_midi_track', newTrackIndex);
    } else {
        // audio
        setObj.call('create_audio_track', newTrackIndex);
    }

    const newTrackObj = new LiveAPI('live_set tracks ' + newTrackIndex);
    const newTrackName = `${sourceTrackName} rs ${time}`;

    newTrackObj.set('name', newTrackName);
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

    addTrack(sourceTrackObj.id, sourceTrackObj.get('name'), 'audio', 'after'); // var routing = sourceTrackObj.get('available_input_routing_types');
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
