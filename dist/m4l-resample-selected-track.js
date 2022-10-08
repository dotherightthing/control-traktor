/* exported bang, loadbang, resampleSelectedTrack */
// https://docs.cycling74.com/max8/vignettes/jsrequire
include('_string.polyfill.js');

var getSelectedTrackObj = require('_getSelectedTrackObj');

var getTrackIds = require('_getTrackIds');

var log = require('_log');

var selfOnMasterTrack = require('_selfOnMasterTrack'); // support console.log


var console = {
  log: log
}; // eslint-disable-line no-unused-vars
// inlets and outlets

inlets = 1;
outlets = 1; // local functions and variables

getSelectedTrackObj.local = 1;
getTrackIds.local = 1;
log.local = 1;
selfOnMasterTrack.local = 1; // global functions and variables

/**
 * @function bang
 * @summary Runs automatically when 'live.thisdevice' left outlet is connected to 'js script-name.js' inlet
 */

function bang() {// eslint-disable-line no-unused-vars
  // this_device = the Max for Live Device object that contains this JavaScript code
  // in the max object, live.thisdevice determines when the Max Device has completely loaded
  // and sends a bang from its left outlet when the Device is fully initialized, including the Live API).
}
/**
 * @function loadbang
 * @summary Executes when the Max patch opens
 */


function loadbang() {
  console.log('m4l-resample-selected-track initialized.'); // eslint-disable-line no-console
}
/**
 * @function resampleSelectedTrack
 * @summary Resample the selected track
 * @param {string} insertPosition Insert position relative to selected track (before|after)
 */


function resampleSelectedTrack(insertPosition) {
  var onMasterTrack = selfOnMasterTrack();

  if (onMasterTrack) {
    var selectedTrackObj = getSelectedTrackObj(); // console.log(selectedTrackObj.get('clip_slots')); // eslint-disable-line no-console
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null

    if (typeof selectedTrackObj === 'object' && selectedTrackObj !== null) {
      var selectedTrackHasAudioOutput = Boolean(Number(selectedTrackObj.get('has_audio_output')));
      var selectedTrackHasMidiOutput = Boolean(Number(selectedTrackObj.get('has_midi_output')));
      var selectedTrackId = selectedTrackObj.id;
      var selectedTrackColor = String(selectedTrackObj.get('color'));
      var newTrackType;

      if (selectedTrackHasAudioOutput) {
        newTrackType = 'audio';
      } else if (selectedTrackHasMidiOutput) {
        newTrackType = 'midi';
      }

      if (typeof newTrackType === 'string') {
        var newTrackObj = insertTrack(selectedTrackId, newTrackType, insertPosition);

        if (!newTrackObj || newTrackObj === null) {
          return;
        } // get selectedTrackName after insertion as an insert to the left will change its numeric suffix


        var selectedTrackName = String(selectedTrackObj.get('name')); // const selectedTrackClipLength = 0; // TODO

        var newTrackInputRoutingTypes = newTrackObj.get('available_input_routing_types');
        var newTrackName = createTrackName(selectedTrackName, true);
        var newTrackInputType = getTrackInputType(newTrackInputRoutingTypes, selectedTrackName);
        newTrackObj.set('name', newTrackName);
        newTrackObj.set('color', selectedTrackColor);
        newTrackObj.set('input_routing_type', newTrackInputType);
        newTrackObj.set('arm', 1); // ...
        // move focus from new track back to selected track

        var viewObj = new LiveAPI('live_set view');
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


function createTrackName(baseName) {
  var timeStamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var timeStampStr = '';
  var trackName = '';

  if (timeStamp) {
    var date = new Date();
    timeStampStr = "".concat(String(date.getHours()).padStart(2, '0'), ":").concat(String(date.getMinutes()).padStart(2, '0'));
  }

  timeStampStr = timeStamp ? " (".concat(timeStampStr, ")") : '';
  trackName = "[".concat(baseName, "]").concat(timeStampStr);
  return trackName;
}
/**
 * @function getTrackInputType
 * @param {string} availableInputTypes Stringified array of objects
 * @param {symbol} sourceTrackName Name of existing track to use as the audio source
 * @returns {object} inputType
 * @see {@link https://github.com/weston-bailey/m4l-plugins/blob/067fd5b9da8350229d1539ae97a2be7f5ed6c19c/max-projects/FFX%20Freq%20Seq%20Proj/code/fsTracker.js#L116}
 */


function getTrackInputType() {
  var availableInputTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var sourceTrackName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var sourceTrackNameStr = String(sourceTrackName);
  var trackInputType;
  var routing = JSON.parse(availableInputTypes); // de-string

  routing.available_input_routing_types.forEach(function (type) {
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


function insertTrack(sourceTrackId) {
  var trackType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'audio';
  var insertPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'after';
  var setObj = new LiveAPI('live_set'); // setObj fails if Preview is off

  if (!setObj) {
    return null;
  }

  var trackId = Number(sourceTrackId);
  var trackIds = getTrackIds();
  var trackIndex = trackIds.indexOf(trackId);
  var newTrackIndex = insertPosition === 'before' ? trackIndex : trackIndex + 1;
  setObj.call("create_".concat(trackType, "_track"), newTrackIndex);
  var newTrackObj = new LiveAPI('live_set tracks ' + newTrackIndex);
  return newTrackObj;
}