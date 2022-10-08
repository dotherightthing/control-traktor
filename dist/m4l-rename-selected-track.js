/* exported bang, loadbang, renameSelectedTrack */
// https://docs.cycling74.com/max8/vignettes/jsrequire
include('_string.polyfill.js');

var getSelectedTrackObj = require('_getSelectedTrackObj');

var log = require('_log'); // support console.log


var console = {
  log: log
}; // eslint-disable-line no-unused-vars
// inlets and outlets

inlets = 1;
outlets = 1; // local functions and variables

getSelectedTrackObj.local = 1;
log.local = 1; // global functions and variables

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
  console.log('m4l-rename-selected-track initialized.'); // eslint-disable-line no-console
}
/**
 * @function renameSelectedTrack
 * @summary Rename the selected track
 * @param {string} trackName Track name
 */


function renameSelectedTrack(trackName) {
  var selectedTrackObj = getSelectedTrackObj();

  if (typeof selectedTrackObj === 'object') {
    selectedTrackObj.set('name', trackName);
  }
}