/**
 * @function log
 * @see {@link http://compusition.com/writings/js-live-selectedTrackObj-logging}
 */
function log() {
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
}

exports._log = log; // eslint-disable-line no-underscore-dangle
