# Control Traktor

A collection of settings and Max4Live devices for improved control over Traktor Pro.

## Installation only

1. See [INSTALL](https://github.com/dotherightthing/control-traktor/blob/main/INSTALL.md)

## Installation and development

1. [Install Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. `git clone` this repo
3. Run `npm install` to install dependencies, run the build which outputs to `dist`
4. Run `npm run backup` to overwrite local files with deployed files
5. Run `npm run reinstall` to recreate `dist` folder
6. Run `npm run watch` to build as you save file changes

## Release

1. Update the `version` in package.json
2. Tag the latest commit with the message `Bump version`
3. Push to Github and an action will run to generate a new *Release*
4. Open [the Releases page](https://github.com/dotherightthing/control-traktor/releases) > select the release > Edit > Select Previous tag > Generate release notes

## Screenshots

![Screenshot of Stream Deck - Page 1.](./screenshots/stream-deck-page-1.png)
![Screenshot of Stream Deck - Page 2.](./screenshots/stream-deck-page-2.png)
![Screenshot of Stream Deck - Page 3.](./screenshots/stream-deck-page-3.png)
![Screenshot of Stream Deck - Page 4.](./screenshots/stream-deck-page-4.png)
![Screenshot of Stream Deck - Page 5.](./screenshots/stream-deck-page-5.png)

---

## Release notes

See <https://github.com/dotherightthing/control-traktor/releases>

--

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
