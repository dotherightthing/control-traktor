# Control Traktor

## System requirements

* macOS (tested on *Sonoma 14.7.1*)
* Traktor Pro (tested on *Traktor 3.11*)
* Terminal (to run installation script)

### For S8 controls

* Traktor Kontrol S8

### For routing S8 inputs to Deck D

* Rogue Amoeba Loopback (tested on *2.4.5*)

### For Stream Deck controls

* Elgato Stream Deck XL

### For pitching of deck key

* Korg nanoKEY2

### For MIDI sequencing of hot cues & freeze slices

* Ableton Live (tested on *Live 12*)
* Push 2
* ClyphX Pro (for *Live 12*)

---

## Installation script

1. Download the latest release zip from <https://github.com/dotherightthing/control-traktor/releases>
2. Extract the zip folder
3. Open Terminal.app
4. Type `cd `, drag the extracted zip folder into Terminal, then press ENTER, to set the release folder as the root directory
5. Type `chmod a+x install.sh` followed by ENTER, to make the installation script executable
6. Type `./install.sh 3.11.1` followed by ENTER, to run the installation script (note: this library has only been tested with Traktor `3.11.1`)
7. Open *live/CT6.als* to view the Live set

The following files will automatically be installed:

* `Macintosh HD/Users/USERNAME/nativeKONTROL/ClyphX_Pro`
  * `X-Controls.txt`
* `Macintosh HD/Users/USERNAME/Documents/Native Instruments/Traktor 3.11.1`
  * `CT6 - App Export.tsi`
  * `CT6 - Deck A.tsi`
  * `CT6 - Deck B.tsi`
  * `CT6 - Global.tsi`
  * `CT6 - Korg nanoKEY2.tsi`
  * `CT6 - S8.tsi`
  * `CT6 - Streamdeck XL.tsi`
* `Macintosh HD/Users/USERNAME/Documents/control-traktor/live`
  * `CT6.als`
* `Macintosh HD/Users/USERNAME/Documents/control-traktor/streamdeck-xl/icons`
  * various icons
* `Macintosh HD/Users/USERNAME/Documents/control-traktor/streamdeck-xl/plugins/streamdeck-midi-plugin/cycle-files`
  * various XML files
* `Macintosh HD/Users/USERNAME/Library/Application Support/Loopback`
  * `Devices.plist`
  * `RecentApps.plist`
* `Macintosh HD/Users/USERNAME/Music/Ableton/User Library/Presets`
  * `Instruments/Drum Rack`
    * `CT6 SeqPads.adg`
  * `Instruments/Instrument Rack`
    * `CT6 Rack.adg`
  * `MIDI Effects/Max MIDI Effect`
    * `CT6 Params.adv`
    * `CT6 Params.amxd`
  * `MIDI Effects/Pitch`
    * `CT6 Liveto Traktor.adv`

## Manually install the copied controller mappings

1. Traktor > Settings > Add > Import TSI > Import Other... > `CT6 - App Export.tsi`
2. Traktor > Settings > Add > Import TSI > Import Other... > `CT6 - Deck A.tsi`
3. Traktor > Settings > Add > Import TSI > Import Other... > `CT6 - Deck B.tsi`
4. Traktor > Settings > Add > Import TSI > Import Other... > `CT6 - Global.tsi`
5. Traktor > Settings > Add > Import TSI > Import Other... > `CT6 - Korg nanoKEY2.tsi`
6. Traktor > Settings > Add > Import TSI > Import Other... > `CT6 - S8.tsi`
7. Traktor > Settings > Add > Import TSI > Import Other... > `CT6 - Streamdeck XL.tsi`

## Ableton Live

### Set up Virtual MIDI ports

These allow the Stream Deck XL and Ableton Live to communicate.

1. Open macOS *Audio MIDI Setup*
2. Double-click *IAC Driver* (in red)
3. Click `+` to add a *Bus*
4. Double-click the bus name and rename to `StreamDeck2Daw`
5. Click `+` to add a second *Bus*
6. Double-click the second bus name and rename to `Daw2StreamDeck`
7. Ensure that *Device is online* is checked
8. Click *Apply*

### Enable Virtual MIDI ports

1. Open Ableton Live
2. Open *Settings* > *Link, Tempo & MIDI*
3. Under *Input Ports*, locate *IAC Driver (StreamDeck2Daw)* and select the *Track* and *Remote* checkboxes
4. Under *Input Ports*, locate *IAC Driver (Daw2StreamDeck)* and select the *Track* and *Remote* checkboxes
