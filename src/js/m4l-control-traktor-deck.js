// inlets and outlets
inlets = 1;
outlets = 2;

// global functions and variables
let pitchOfMiddleC;

/**
 * @function convertPitchToValue
 * @param {*} pitchPlayed Pitch played
 * @param {*} _pitchOfMiddleC Pitch of middle C
 * @todo Find a way to store pitchOfMiddleC using Max so I don't need to pass it in
 */
function convertPitchToValue(pitchPlayed, _pitchOfMiddleC) {
//   72 - pitchOfMiddleC =  12 * semitoneSize = 1.0
//   71 - pitchOfMiddleC =  11 * semitoneSize = 0.916
//   70 - pitchOfMiddleC =  10 * semitoneSize = 0.833
//   69 - pitchOfMiddleC =  9  * semitoneSize = 0.750
//   68 - pitchOfMiddleC =  8  * semitoneSize = 0.667
//   67 - pitchOfMiddleC =  7  * semitoneSize = 0.583
//   66 - pitchOfMiddleC =  6  * semitoneSize = 0.5
//   65 - pitchOfMiddleC =  5  * semitoneSize = 0.416
//   64 - pitchOfMiddleC =  4  * semitoneSize = 0.333
//   63 - pitchOfMiddleC =  3  * semitoneSize = 0.250
//   62 - pitchOfMiddleC =  2  * semitoneSize = 0.166
//   61 - pitchOfMiddleC =  1  * semitoneSize = 0.083
//   60 - pitchOfMiddleC =  0  * semitoneSize = 0
//   59 - pitchOfMiddleC = -1  * semitoneSize = -0.083
//   58 - pitchOfMiddleC = -2  * semitoneSize = -0.166
//   57 - pitchOfMiddleC = -3  * semitoneSize = -0.250
//   56 - pitchOfMiddleC = -4  * semitoneSize = -0.333
//   55 - pitchOfMiddleC = -5  * semitoneSize = -0.416
//   54 - pitchOfMiddleC = -6  * semitoneSize = -0.5
//   53 - pitchOfMiddleC = -7  * semitoneSize = -0.583
//   52 - pitchOfMiddleC = -8  * semitoneSize = -0.667
//   51 - pitchOfMiddleC = -9  * semitoneSize = -0.750
//   50 - pitchOfMiddleC = -10 * semitoneSize = -0.833
//   49 - pitchOfMiddleC = -11 * semitoneSize = -0.916
//   48 - pitchOfMiddleC = -12 * semitoneSize = -1.0

    const semitoneSize = 1 / 12; // -1 octave, +1 octave
    const midiStepSize = 127 / 24;

    // assuming this is middle C

    // TODO find a way to store pitchOfMiddleC using Max so I don't need to pass it in
    // store the middle C value
    // if (typeof _pitchOfMiddleC !== 'number') {
    //   _pitchOfMiddleC = pitchPlayed;
    // }

    const offsetPitch = pitchPlayed - _pitchOfMiddleC;

    // used to highlight a segment of live.tab grid
    var arrayIndex = offsetPitch + 12;

    // only works if a dedicated CC button is setting this value directly in Traktor
    // var traktorDirectValue = offsetPitch * semitoneSize;

    // emulates a CC Fader/Knob setting a 0-127 value and passing it to Traktor
    var traktorMidiValue = arrayIndex * midiStepSize;

    outlet(0, arrayIndex);
    outlet(1, traktorMidiValue);
}
