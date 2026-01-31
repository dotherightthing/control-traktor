# Control Traktor

A collection of settings and Max4Live devices for improved control over Traktor Pro.

## Installation only

1. See [INSTALL](https://github.com/dotherightthing/control-traktor/blob/main/INSTALL.md)

## Installation and development

1. [Install Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. `git clone` this repo
3. Run `npm install` to install dependencies, run the build which outputs to `release`
4. Run `npm run backup` to overwrite local files with deployed files
5. Run `npm run watch` to build and update the release folder as you save file changes
6. Run `npm run installrelease` to copy the release files to system folders
7. Run `npm run release:shared` to copy the release to `/Users/Shared/control-traktor/release` for sharing with other users on the same machine

### Supporting several macOS users

I run two user accounts on my MacBook Pro - a developer user and a creative user.

When fast-switching between these users, [NIHardwareAgent doesn't activate the S8's screens when it was already started by another user on the same machine](https://github.com/dotherightthing/control-traktor/issues/69).

To resolve this issue, **for each user** create an Automator app to run instead of *Traktor.app*.

1. Open Automator
1. New document > Application > Choose
1. Search for 'Run Applescript' in Actions > Double-click / Drag to right-hand pane
1. Replace `(* Your script goes here *)` with the following:
   * TODO - see [Create an Automator app to kill any NIHardwareAgents that are running before starting Traktor](https://github.com/dotherightthing/control-traktor/issues/70)
1. Search for 'Launch Application' in Actions > Double-click / Drag to right-hand pane
1. Choose Other, then browse to Traktor.app
1. File > Save > /User/Applications > Launch Traktor.app
1. Right-click Traktor launcher.app > 

In future, launch Traktor via *Traktor launcher.app* rather than *Traktor.app*.

This app will quit any existing *NIHardwareAgent*s before starting *Traktor Pro* as normal.

You will be prompted for your user password. This is required to run the embedded `sudo` command, in order to kill processes running under other users.

## Release

1. Update the `version` in package.json
2. Tag the latest commit with the message `Bump version`
3. Push to Github and an action will run to generate a new *Release*
4. Open [the Releases page](https://github.com/dotherightthing/control-traktor/releases) > select the release > Edit > Select Previous tag > Generate release notes

## Release notes

See <https://github.com/dotherightthing/control-traktor/releases>.

## Screenshots

Screenshots are of the Stream Deck XL templates.

Mappings are documented in [CT6.streamDeckProfile.mappings.csv](https://github.com/dotherightthing/streamdeck-xl/blob/master/profiles/traktor/CT6.streamDeckProfile.mappings.csv).

![Screenshot of Stream Deck - Page 1.](./screenshots/stream-deck-page-1.png)
![Screenshot of Stream Deck - Page 2.](./screenshots/stream-deck-page-2.png)
![Screenshot of Stream Deck - Page 3.](./screenshots/stream-deck-page-3.png)
![Screenshot of Stream Deck - Page 4.](./screenshots/stream-deck-page-4.png)
![Screenshot of Stream Deck - Page 5.](./screenshots/stream-deck-page-5.png)
![Screenshot of Stream Deck - Page 6.](./screenshots/stream-deck-page-6.png)

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
