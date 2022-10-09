/**
 * @file m4l-control-traktor-deck--endless-encoders.js
 * @summary Intended for mapping an endless encoders to M4L, but unreliable so used button-based value stepping instead
 */

// global functions and variables
let oldTime;

/**
 * @function getResetValue
 * @param {number} val Value
 * @returns {number} resetValue
 */
function getResetValue(val) {
    // val 60
    // 60 < 64
    // 60 >= 64-10 = 54
    // 60 >= 64-9  = 55
    // 60 >= 64-8  = 56
    // 60 >= 64-7  = 57
    // 60 >= 64-6  = 58
    // 60 >= 64-5  = 59
    // 60 >= 64-4  = 60
    // 60 <  64-3  = 61
    // centerPull = 3
    // resetValue = 60 + 3 = 63
    //
    // val 70
    // 70 >= 64
    // 70 <= 64+10 = 74
    // 70 <= 64+9 = 73
    // 70 <= 64+8 = 72
    // 70 <= 64+7 = 71
    // 70 <= 64+6 = 70
    // 70 >  64+5 = 69
    // centerPull = 5
    // resetValue = 70 - 5 = 65

    let midPoint = 64;
    let centerPull = 10;
    let resetValue;

    if (val < midPoint) {
        // control moving left
        while (val >= (midPoint - centerPull)) {
            centerPull -= 1;
        }

        resetValue = val + centerPull;
    } else {
        // control moving right
        while (val <= (midPoint + centerPull)) {
            centerPull -= 1;
        }

        resetValue = val - centerPull;
    }

    return resetValue;
}

/**
* @function controlStillMoving
* @param {number} val Value
*/
function controlStillMoving(val) {
    let timeDifference = 0;
    const newTime = new Date().getMilliseconds();
    let knobNewValue = val;

    if (typeof oldTime === 'number') {
        timeDifference = (newTime - oldTime);
    }

    if (timeDifference < 1000) {
        knobNewValue = getResetValue(val);
    }

    oldTime = newTime;

    outlet(0, val);
    outlet(1, knobNewValue);
}
