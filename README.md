# M4L Helpers

A collection of Max4Live devices which speed up aspects of my DJing and jamming workflows.

## Installation only

1. Download `release.zip` from the latest [Release](https://github.com/dotherightthing/m4l-helpers/releases)
2. Unzip/expand the folder and copy to `~/Music/Ableton/User\ Library/` (note: devices may be a mix of Audio/Instrument/MIDI types)
3. See device usage instructions below (*Rename Selected Track*, *Presample Selected Track*)

## Installation and development

This repo uses a build script so that I can write JavaScript in ES6 rather than ES5.

1. [Install Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. `git clone` this repo to `~/Music/Ableton/User Library/`
3. Run `npm install` to install dependencies, run the build
4. Run `npm run watch` to lint and build as you save file changes
   * Edit `src/js/m4l-*.js` - the Max-friendly (ES5) version of this file is updated in the `dist` folder
   * Edit `dist/*.amxd` in Max - this file is copied back to the `src/patches` folder

---

## Control Traktor Deck

When using Traktor in unconventional ways, multiple controllers can be involved. This requires setting up a `.tsi` file for each controller in order to map specific controls to Traktor.

This is fiddly and the work needs to be done again when controllers change.

This patch exposes the Traktor controls that I use in my DJing workflow, so that I can easily map my controllers using Ableton Live rather than Traktor.

The same device is used for Deck A and B, the only difference will be the output channel as per the mappings in the TSI file:

* Deck A: Channel 2
* Deck B: Channel 3
* Global mappings are replicated on both channels

Set `MIDI To` to:

* `Traktor Virtual Input`
* `Ch. [channel number, see above]`

### Usage of *Control Traktor Deck*

1. *Traktor > Preferences > Controller Manager > Import > `m4l-control-traktor-deck.tsi`*
   * In-Port: *Traktor Virtual Input*
   * Out-Port: *Traktor Virtual Output*
2. add *Control Traktor Deck.amxd* to the Ableton Live track, into which audio is streaming from Traktor (see my [Traktor Live v3 template](https://github.com/dotherightthing/traktor-live-v3#ableton-live))
   * map controllers to the controls on the device

### Roadmap for *Control Traktor Deck*

See <https://github.com/dotherightthing/m4l-helpers/labels/Control%20Traktor%20Deck>

---

## Presample Selected Track

When jamming with soft synths or hardware synths, MIDI notes are driving that synth. Recording into the instrument channel would therefore record the MIDI input rather than the audio output. When recorded MIDI is played back at a later date, the sound is often different to what was originally played, due to some combination of synth settings not being saved with the MIDI input (this is especially the case with hardware synths). In this instance it's better to capture the audio output rather than the MIDI input. For synths that don't have MIDI input, audio capture is the only option.

On the Push2, creation of a track-based audio (or MIDI) resampling track necessitates multiple button presses and two hands. This interrupts the creative flow as it requires extensive hand-eye coordination:

1. Press 'Mix'
2. Press 'Mix'
3. Press to select 'Input & Output'
4. Scroll to select 'Input Type'
5. Press Record + Track Select
6. Rename new track in software
7. Recolour new track

Key/MIDI mapping the `Insert before` and `Insert after` buttons automates this process, by:

1. inserting a new track BEFORE (to the left of) or AFTER (to the right of) the selected track
2. matching the type of the new track to the type of the selected track (Audio or MIDI)
3. setting the input of the new track to the name of the selected track
4. arming the new track
5. naming the new track to indicate the source name and the time of creation
6. recolouring the new track to match the selected track's colour
7. returning the focus to the selected track

Recording can now be started via a single button press on the desired clip slot.

Note: This patch is functionally similar to ClyphX Pro's `INSAUDIO`/`INSMIDI`.

### Usage of *Presample Selected Track*

1. add *Presample Selected Track.amxd* to Master track
2. map button on Push2 or other controller to `Insert before` and/or `Insert after` button
3. select an Audio, MIDI, or Instrument track
4. push mapped button from (2) to insert a resampling track
5. alternatively use [Mira](https://cycling74.com/products/mira/) to view the Mira frame on an iPad, then tap one of the *(Mira)* buttons to insert a resampling track

### Roadmap for *Presample Selected Track*

See <https://github.com/dotherightthing/m4l-helpers/labels/Presample%20Selected%20Track>

---

## Rename Selected Track

When jamming it's easy to lose track of what each track represents. This function provides a quick way to name the track from a list of common options.

### Usage of *Rename Selected Track*

1. add *Rename Selected Track.amxd* to Master track
2. map tabs object to encoder on non-Push controller
3. select an Audio, MIDI, or Instrument track
4. turn mapped encoder from (2) to change the track name and see it update instantly
5. alternatively use [Mira](https://cycling74.com/products/mira/) to view the Mira frame on an iPad, then tap a tab (option) on Mira to change the selected track name
6. alternatively lock Push to the device on the Master track, and turn the `TRACKNAME` encoder

### Roadmap for *Rename Selected Track*

See <https://github.com/dotherightthing/m4l-helpers/labels/Rename%20Selected%20Track>

---

## Thanks to

* [Ableton Max For Live Beginner's Masterclass (Phelan Kane / CM)](https://www.youtube.com/watch?v=tkXz8sf-KwU&t=751s)
* [Learning The Live Object Model and Creating 0dB Max (Josh Spoon / The Producer's Kitchen)](https://www.youtube.com/watch?v=agtnMQkDjUE)
* [Traversing the Ableton Live Object Model (Jeff Merkel)](https://www.youtube.com/watch?v=qeabaagMZr8)
* [JavaScript Live API Tutorials (Adam Murray / Compusition)](http://compusition.com/writings/js-live-api)
* [LOM - The Live Object Model (Cycling 74)](https://docs.cycling74.com/max8/vignettes/live_object_model)
* [Max JS Require Guide (Cycling 74)](https://docs.cycling74.com/max8/vignettes/jsrequire)
* [Paste pre-formed Max patches from Max's library](https://youtu.be/GvBAKJcK_S0?t=48)
* [Map UI objects to control surfaces incl Push2 (Phelan Kane)](https://youtu.be/tkXz8sf-KwU?t=3478)
* [Using prototypes to change the appearance of UI objects (Cycling 74)](https://youtu.be/yLhsm64lHS8?t=190)
* [Long Name is for Automation, Short Name is for UI (Cycling 74)](https://youtu.be/jfA61vLImNI?t=48)
* [The Max js object uses version 1.8.5 of the JavaScript language, a Mozilla specific superset of ECMAScript 5 (Cycling 74)](https://docs.cycling74.com/max8/tutorials/javascriptchapter01)

Tip: Search a YouTube video for 'Push': *Click 3 dots > Show transcript > Search in video*

## Insights

### Passing variables to the JavaScript file

#### Technique A: Arguments

Patcher:

```txt
[live.tab] # UI object sending input to script
  | | |
    |
  [js script-name.js] # js object containing script (see list of tested variations below)
```

JS:

```js
function bang()
  if (jsarguments.length > 1) {
    post(jsarguments[0]); // script name
    post(jsarguments[1]); // first argument
  }
}
```

I couldn't figure out how to use a dynamic value with this approach, as when a value is sent into the `js` object's inlet,
it is treated as a function name rather than a string argument. That generates an error as there is no matching function.

> js: no function argName [script-name.js]

This error can be mitigated by adding an `anything()` function:

```js
function anything() {
  console.log(jsarguments.length);
  console.log(jsarguments[0], jsarguments[1]);
}
```

However I still couldn't figure out how to pass in a reference to the Symbol value generated by the middle outlet of `live.tab`:

```txt
js script-name.js              => anything() => script-name.js, <undefined>
sprintf js script-name.js %s   => anything() => no output
prepend js script-name.js      => anything() => no output
js rename-selected-track.js $1 => anything() => script-name.js, $1
js rename-selected-track.js $s => anything() => script-name.js, $s
```

Links:

* <https://docs.cycling74.com/max8/refpages/js#jsarguments>
* <https://docs.cycling74.com/max8/vignettes/jsbasic#How_Input_to_the_js_Object_is_Handled>

#### Technique B: Listeners

Patcher:

```txt
[live.tab] # UI object to listen to in script + named  (via the Scripting Name field?)

[live.button] # live.button object to send bang
  |
[js script-name.js] # js object containing script
```

JS:

```js
function bang() {
  // Run garbage collection
  gc();

  // Target object from patcher
  const obj = this.patcher.getnamed('namedObject');

  // Assign listener
  const ml = new MaxobjListener(obj, objCallback);

  // Get the current value
  post(ml.getvalue());
}

// When the listener detects a change, fire a callback
function objCallback(data) {
  // Get the latest value
  post(data.value);
}
```

Issues:

When the object has multiple outlets, you can't choose the one with the data type you want.
For the `live.tab` object, I wanted the middle outlet (string `Symbol`) not the left outlet (`Item Index`).
The latter would have only been useful if had access to the object's `enum` so I could get the string that the index referred to.

Links:

* <https://docs.cycling74.com/max8/vignettes/scripting_topic> - `maxobjlistener-example.maxpat`
* <https://docs.cycling74.com/max8/vignettes/jsmaxobjlistener>

#### Technique C: Global functions

As the above two techniques didn't work for me, I settled on using global functions.
This encouraged me to merge several separate scripts into one, and then to hide helper functions using `privateFunctionName.local = 1`.

Patcher:

```txt
[live.tab] # UI object sending input to script
  | | |
    |
[functionName $1] # message object containing function to call + variable argument
    |
  [js script-name.js] # js object containing script containing function
```

JS:

```js
function functionName(arg) {
  post(arg);
}
```

Links:

* <https://docs.cycling74.com/max8/vignettes/jsbasic#Private_(Local)_Functions>

---

### Inspector: Bang when Transition from

For buttons (`live.text`) MIDI mappable controls should activate on mouse down AND mouse up, to prevent 2 clicks being required to repeat the action.

For buttons (`live.text`) Mira-only controls should only activate on transition from zero to one, otherwise every touch would trigger the action twice.

---

### Mira

#### Mira supports

* `live.dial` (with label)
* `live.grid`
* `live.meter`
* `live.number`
* `live.slider`
* `live.tab`
* `live.text` (with label - button/toggle, also see prototypes)
* `live.toggle`

#### Mira does not support

* `live.adsrui`
* `live.arrows`
* `live.comment`
* `live.gain`
* `live.line`
* `live.menu`
* `live.scope`
* `live.step`

#### Links

* [Mira iPad app (Cycling 74)](https://cycling74.com/products/mira/)
