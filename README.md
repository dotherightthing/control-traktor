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

## Control Traktor Deck v3 (2023.04.23)

### Description

* sequences Traktor via MIDI Hot Cue manipulation
* this is faster than sampling into Live and then resequencing
* this is more flexible than sampling into Traktor's Remix Decks
* this is more robust than sampling into Traktor's Loop Recorder

### Files

* `src/patches/Control Traktor Deck v3.amxd`
* `src/traktor/Control Traktor Deck v3 A.tsi`
* `src/presets/Control Traktor Deck v3 - Deck A Cues.adg`
* `src/presets/Control Traktor Deck v3 - Deck A Keys + Controls.adg`
* `src/sets/Control Traktor Deck v3.als`

### Setup

#### Live

* create a MIDI track and insert *Control Traktor Deck v3 - Deck A Cues.adg*
  * set input to *Push2* (to exclude input from MIDI keyboard which would otherwise be recorded into the sequencer)
* create a MIDI track and insert *Control Traktor Deck v3 - Deck A Keys + Controls.adg*
  * set input to *All* (to allow control from Push2 or MIDI Keyboard)

### Traktor controls

* Global MIDI Sync:
  * trigger from a coloured pad in the Drum Rack
* Track *Hot Cues*:
  * sequence from Drum Rack Sequencer
* Track *KEY*:
  * capture middle note of the 2-octave MIDI keyboard key range
  * control via encoder/automation or MIDI keyboard/automation
  * sequence from Melodic Sequencer
* Track *PAN*:
  * control via encoder/automation
  * sequence from Melodic Sequencer
* Track *GAIN*:
  * control via encoder/automation
  * sequence from Melodic Sequencer

### Dev notes

#### Initial experiment

* Had a play with sequencing as forgot about *Drum Rack To CC Hot Cue Sequencer* - used TST1 Live set.
* Hot cue automation doesn't seem to be recorded from Push2 so had to draw it in.
* Pitch automation was recorded from CS1x.

and

* The Drum Rack is programmed by sending notes rather than CCs
* Grabbing MIDI from the Drum Rack channel on a separate MIDI out channel was still problematic to get it into Traktor
* Rather than looking at the notes on the software Drum Rack to figure out how to map Push inside the Traktor controller manager, it's easier to click the Learn button in Traktor and press the notes on the controller
* Deleting the Drum Rack channel and inputting directly into a Melodic Sequencer on the MIDI Out channel works better
* The note length can be changed by holding down the start position on the sequencer and pushing the end position
* Nothing else can be edited - this is where an M4L device would come in - to allow e.g. pitch or volume to be set at a sequencer position

and

* Good article here: [Using Ableton Push and Drum Racks to Control External Hardware](https://ask.audio/articles/using-ableton-push-and-drum-racks-to-control-external-hardware)
* Apparently the way to do it is to have an External Instrument on every pad of the Drum Rack. This allows MIDI notes to be sent out of the Drum Rack, so that the Hot Cues to be sequenced individually.
* Other deck controls can be managed via a single device at the Rack level. This can be controlled from each Hot Cue by sequencing the rack macros.
* A parent Instrument Rack allows different key ranges to be assigned to the Drum Rack and the Key Adjust (via the Max4Live plugin). This prevents input intended for the Key Adjust from accidentally triggering a Drum Rack pad (or moving the focus by selecting one without an External Instrument on it). However it didn't restrict what was actually recorded into the sequencer.

#### Solution

* replaced `js filename` with sub `patcher` to resolve JS randomly reverting to an old version with less outlets
* used `expr` to reimplement JS formulas in a more succinct way than using lots of graphical numbers and operators
* MIDI keyboard drives the Key dial
* Gain and Balance knobs are on the same device as Key control, so that it's intuitive to select the correct device to automate them from
* Dual tracks used in order to use the best sequencer for the job and keep the recorded MIDI data clean and easily editable
  * triggers: Drum Rack (Hot Cues)
  * melody: M4L plugin (Key pitching)

#### Issues

* Dial automation is intended to allow per-step pitch changes, but this is problematic:
  * MIDI notes drive the Live Dial (good) but are also captured as MIDI notes
  * Recorded MIDI notes trump encoder Dial automation (forcing the Re-Enable Automation light to turn on)
  * Macro knob mapping not usable as this prevents MIDI keyboard control of the Key dial
  * Deleting Dial automation doesn't delete MIDI notes
  * Per-step Dial automation can be fiddly when trying to effect a range
* Getting rid of the dial would be better
  * [Learn Push 2: 32-Note Melodic Step Sequencer](https://www.youtube.com/watch?v=GVilj3bChHY) has info on programming the notes - if I mastered this then the desired but problematic per-step control over the Key encoder position would be less useful.

### TODO

* Create variants for Deck B etc

#### Usage tips

* Sequencer: Layout > Note (Drums: Loop Selector)
* Drum Rack macros: Device > Drum Rack > Rec + Automate > Adjust encoder
* Note length (Traktor's Hot Key mapping is "Hold" rather than "Trigger")
  * Clip > Press on sequencer pad > Length
  * Clip > Press on sequencer pad > Press on another pad
* To stop clip (e.g. to delete and create Cue point in Traktor):
  * Layout > Session > Select clip > Stop clip, or
  * Layout > Session > Select clip > Toggle Clip to "Loop OFF"
* Load same track into another deck: drag and drop track header (triggering polyphony is 1)
* Delete automation: Delete > Touch encoder
* Phrasing
  * If duplicating a clip and triggering the new one, be aware that it might not sound the same as Traktor could be mid sequence when the new clip is triggered.
  * The solution is to stop playback of the Traktor deck and/or check that there are no gaps between the MIDI notes, so that Traktor is not filling in the silent gaps.
  * Also setting the MIDI clips to Trigger "Legato" so there's no drop out in audio when transitioning between clips.
* Note mapping
  * There is an octave difference between Live and Traktor:
  * Live Drum Rack "Hot Cue 1" plays C0 on MIDI channel 4
  * Traktor: Hot Cue 1 mapped to Note C1 on Channel 4
* Editing clip / viewing sequencer
  * Push2 > Clip > Select > Tap Drum Pad
* MIDI note recording
  * keyboard midi notes are recorded regardless of the Chain key range settings
  * so the MIDI In must be configured to restrict recorded input
* Melodic sequencer
  * Scale mode "Sequential" + "Major" + "Chromatic" + "Vertical" visually makes some sense (light off = black key)
  * Select + note highlights the note in the sequencer.
  * Orange pad indicates a C note.
* Traktor gotchas
  * Toggling from Deck C to Deck A  interrupts playback of MIDI.
* M4L
  * when using `live.foo` components in M4L, set the "Parameter Visibility" to `hidden` to remove irrelevant cruft from Live's MIDI clip's Envelopes drop-down

---

## Control Traktor Deck v2

### Status

* Superceded by *Control Traktor Deck v3*

### Files

* `src/js/m4l-control-traktor-deck.js`
* `/src/patches/Control Traktor Deck v2.amxd`
* `/src/traktor/Control Traktor Deck v2.tsi`

### Description

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

### Usage

1. *Traktor > Preferences > Controller Manager > Import > `m4l-control-Traktor-deck.tsi`*
   * In-Port: *Traktor Virtual Input*
   * Out-Port: *Traktor Virtual Output*
2. add *Control Traktor Deck.amxd* to a **MIDI** track in Ableton Live (see my [Traktor Live v3 template](https://github.com/dotherightthing/Traktor-live-v3#ableton-live))
   * map controllers to the controls on the device

### Roadmap

See <https://github.com/dotherightthing/m4l-helpers/labels/Control%20Traktor%20Deck>

---

## Drum Rack To CC Hot Cue Sequencer (2023.02.09)

* triggers a Traktor Hot Cue from a Live Drum Rack, by converting the Drum Rack MIDI note to a MIDI CC that is mapped to the Hot Cues in Traktor
* superceded by *Control Traktor Deck v3* which maps the Drum Rack notes directly to Traktor's Hot Cues in the `.tsi` file

### Files

* `src/patches/Drum Rack To CC Hot Cue Sequencer.amxd`
* `src/traktor/Drum Rack To CC Hot Cue Sequencer.tsi`

### Dev notes

#### Initial experiment

##### Traktor

* created a TSI
* mapped 'Select/Set+Store Hotcue' 1-8 Deck A to Ch2 CC 20-28

##### Live

* created a MIDI channel
* MIDI To = Traktor Virtual Input Ch2
* created a MIDI clip
* Notes tab: drew in some notes (note there seems to be an octave difference between how Live and Traktor experience notes)
* MIDI Ctrl tab: drew in events for 20, 21, 22, 23
* played clip
* Deck A jumps between hot cues and changes the pitch

##### Push 2

* melodic sequencer only shows note events
* note selection is confusing
* can't see how to change CC on push
* however on Deck A, the Control Traktor Deck also appears in the MIDI Ctrl tab, so could have hot cues assigned to a single encoder and then set this position in the sequencer (this works with sequencing the balance knob on Deck A)

##### Thoughts

That was pretty easy to set up, but the UX is pretty bad unless you're interacting with Live directly.

It would be better if I could either

* capture pad presses coming out of Traktor, or
* use M4L to hijack a key range of a drum rack to send cc messages

#### Solution

* added M4L midi device on same track as Drum Rack; it sits before the Drum Rack but this is ok
* notein captures the Drum Rack output as a pitch value (int)
* then subtracted known difference between that value and hot cue int 
* then triggered hot cue tab (visual confirmation)
* then this is output as the CC message that Traktor is expecting
* select the M4L device on Push2, + Note + Layout > Drums: Loop Selector - this shows the Hot Cue setting being automated as well as the drum pads triggering and the sequencer for the selected drum pad
* Drum Rack only has an audio out, but Deck A can have MIDI From the Drum Rack track, then MIDI To Traktor Virtual Input

##### Issues

* difficult to select a pad without side effects, even when pressing Select on Push2 - looks like Select sends a MIDI event which causes Traktor to send a note off so the phrasing temporarily changes
* need to assign a set hot cue (eg 0 or 8) as a 'note off', otherwise it's impossible to retrigger a hot cue; setting a hot cue to the end of the track produces an audible glitch, perhaps it's an inter track mix sound for this track
* have to toggle track arm on to program notes from Push2, then off afterwards to hear what you've programmed
* cannot color code a drum pad without loading a sample into it

##### TODO

* limit the pitch range affected by the M4L device, to the topmost rack (or a configurable root note)
* allow notes to also be set from the Drum Rack e.g. bottommost rack (or a configurable root note)
* map hot cue (cc) 'velocity' to track volume, could also be used for faux ADSR
* filter out the Push2 select button if this isn't filtered in the pitch limiting
* all CCs are going out at 127 value, could try 0 for true note off, or initially 0 then small ms delay then 127
* make the note off cue a loop of silence so there's no risk of a sound being eard
* or make the note off volume 0, and/or ramp the volume down
* name MIDI clip with the name of the song to 'save the patch' so it can be loaded again with the same song and hot cues
* And bookmark <https://www.ableton.com/en/manual/using-push-2/> - 31.3 and 31.4

---

## Presample Selected Track

### Files

* `src/js/m4l-presample-selected-track.js`
* `src/patches/Presample Selected Track.amxd`

### Description

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

### Usage

1. add *Presample Selected Track.amxd* to the Master **Audio** track in Ableton Live
   * map button on Push2 or other controller to `Insert before` and/or `Insert after` button
2. select an Audio, MIDI, or Instrument track
   * push mapped button from (2) to insert a resampling track
   * alternatively use [Mira](https://cycling74.com/products/mira/) to view the Mira frame on an iPad, then tap one of the *(Mira)* buttons to insert a resampling track

### Roadmap

See <https://github.com/dotherightthing/m4l-helpers/labels/Presample%20Selected%20Track>

---

## Rename Selected Track

### Files

* `src/js/m4l-rename-selected-track.js`
* `src/patches/Rename Selected Track.amxd`

### Description

When jamming it's easy to lose track of what each track represents. This function provides a quick way to name the track from a list of common options.

### Usage

1. add *Rename Selected Track.amxd* to the Master **Audio** track in Ableton Live
   * map tabs object to encoder on non-Push controller
2. select an Audio, MIDI, or Instrument track
   * turn mapped encoder from (2) to change the track name and see it update instantly
   * alternatively use [Mira](https://cycling74.com/products/mira/) to view the Mira frame on an iPad, then tap a tab (option) on Mira to change the selected track name
   * alternatively lock Push to the device on the Master track, and turn the `TRACKNAME` encoder

### Roadmap

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
* [Places to Learn Max (Cycling 74)](https://cycling74.com/places-to-learn-max) > Books > [Max for Live Ultimate Zen Guide](https://leanpub.com/Max-for-Live-Ultimate-Zen-Guide)
* [How to map Encoders in Traktor](https://www.youtube.com/watch?v=BJZ27iVoq2A)
* [Midi Filter Select 1.4](https://www.maxforlive.com/library/device/4365/midi-filter-select) for the [gswitch](https://docs.cycling74.com/max8/refpages/gswitch?q=gswitch) tip

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
