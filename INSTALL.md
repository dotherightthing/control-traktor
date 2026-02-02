# Control Traktor

## System requirements

* macOS (tested on *Sonoma 14.7.1*)
* Terminal (to run installation script)
* Traktor Pro (tested on *Traktor 3.11*)

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

Note: *~* (tilde) means *Macintosh HD/Users/USERNAME*.

1. Download the latest release zip from <https://github.com/dotherightthing/control-traktor/releases>
2. Extract the zip folder
3. Open Terminal.app
4. Type `cd `, drag the extracted zip folder into Terminal, then press ENTER, to set the release folder as the root directory
5. Type `./install.sh 3.11.1` followed by ENTER, to run the installation script (note: this refers to the folder title at *~/Documents/Native Instruments/Traktor X.XX.X*, NOT the *Version* shown in *Traktor > About Traktor*)
6. The installer will open the output folder, **~/Documents/control-traktor**, which contains the following:
   * **automator**, containing:
      * **Launch Traktor.app** - kills any *NIHardwareAgent* processes before launching Traktor as usual (see Issue [#69](https://github.com/dotherightthing/control-traktor/issues/69)). Note that you will be prompted for your user password - this is required to run the `killall` command as a superuser (`sudo`) in order to kill processes running under both the current user and any other users on the same machine.
   * **bome-midi-translator-pro**, containing:
     * *stream-deck-traktor.bmtp* - preset for Bome
   * **ClyphX Pro - XTB** - shortcut to *~/nativeKONTROL/ClyphX_Pro/XTB*, containing *X-Controls.txt*
   * **live**
     * *CT6.als* - a Live set
     * *Live Presets - Drum Rack* - shortcut to *~/Music/Ableton/User Library/Presets/Instruments/Drum Rack*, containing:
        * *CT6 SeqPads.adg*
     * *Live Presets - Instrument Rack* - shortcut to *~/Music/Ableton/User Library/Presets/Instruments/Instrument Rack*, containing:
        * *CT6 Rack.adg*
     * *Live Presets - Max MIDI Effect* - shortcut to *~/Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect*, containing:
        * *CT6 Params.adv*
        * *CT6 Params.amxd*
     * *Live Presets - Pitch* - shortcut to *~/Music/Ableton/User Library/Presets/MIDI Effects/Pitch*, containing:
        * *CT6 Liveto Traktor.adv*
   * **Loopback** - shortcut to *~/Library/Application Support/Loopback*, containing:
        * *Devices.plist*
        * *RecentApps.plist*
   * **streamdeck-xl**
     * *icons*, containing:
        * various icons used by *Traktor (CT6).streamDeckProfile*
     * *plugins*, containing:
        * configuration files used by Stream Deck plugins
   * **Traktor 3.11.1** - shortcut to *~/Documents/Native Instruments/Traktor 3.11.1*, containing:
     * *CT6 - App Export.tsi*
     * *CT6 - Deck A.tsi*
     * *CT6 - Deck B.tsi*
     * *CT6 - Global.tsi*
     * *CT6 - Korg nanoKEY2.tsi*
     * *CT6 - S8.tsi*
     * *CT6 - Streamdeck XL.tsi*

## Manually install the copied controller mappings

### Bome

1. *~/Documents/control-traktor/bome-midi-translator-pro/stream-deck-traktor.bmtp* > double-click (to open)

### Stream Deck XL

1. *~/Documents/control-traktor/streamdeck-xl/profiles/Traktor (CT6).streamDeckProfile* > double-click > *Install*
2. Traktor (CT6) profile will be loaded and selected
3. Fix corrupted profile page navigation
   1. Click *Pinned actions* (icon to left of page buttons *1 2 3 4 5*)
   2. *A Decks/Rec*
      1. Click *A Decks/Rec*
      2. Click arrow to the right of *3 actions*
      3. Click *Navigation: Switch Profile* (first action)
      4. Change *Profile* from *Home* to *Traktor (CT6*)
      5. Leave *Page* as *A - Decks/Rec*
   3. *B Rmx Deck*
      1. Click *B Rmx Deck*
      2. Click arrow to the right of *3 actions*
      3. Click *Navigation: Switch Profile* (first action)
      4. Change *Profile* from *Home* to *Traktor (CT6*)
      5. Change *Page* to *B - Rmx Deck*
   4. *C Browser*
      1. Click *C Browser*
      2. Click arrow to the right of *3 actions*
      3. Click *Navigation: Switch Profile* (first action)
      4. Change *Profile* from *Home* to *Traktor (CT6*)
      5. Change *Page* to *C - Browser*
   5. *D Settings*
      1. Click *D Settings*
      2. Click arrow to the right of *3 actions*
      3. Click *Navigation: Switch Profile* (first action)
      4. Change *Profile* from *Home* to *Traktor (CT6*)
      5. Change *Page* to *D - Settings*

### Traktor

Note: *Import Other* always opens in *~/Documents/Native Instruments/Traktor X.XX.X* (which is why *.tsi* files are copied here).

1. Traktor > Settings > Controller Manager > Add > Import TSI > Import Other... > *CT6 - Deck A.tsi*
2. Traktor > Settings > Controller Manager > Add > Import TSI > Import Other... > *CT6 - Deck B.tsi*
3. Traktor > Settings > Controller Manager > Add > Import TSI > Import Other... > *CT6 - Global.tsi*
4. Traktor > Settings > Controller Manager > Add > Import TSI > Import Other... > *CT6 - Korg nanoKEY2.tsi*
5. Traktor > Settings > Controller Manager > Add > Import TSI > Import Other... > *CT6 - S8.tsi*
6. Traktor > Settings > Controller Manager > Add > Import TSI > Import Other... > *CT6 - Streamdeck XL.tsi*
7. Traktor > Settings > Controller Manager > Import > *CT6 - App Export.tsi* - OPTIONAL - this overwrites Traktor configuration settings; select the desired properties to overwrite, I choose all except *Controller Mappings*

## Ableton Live

### Set up Virtual MIDI ports

These allow the Stream Deck XL and Ableton Live to communicate.

1. Open macOS *Audio MIDI Setup*
2. Double-click *IAC Driver* (in red)
3. Click *+* to add a *Bus*
4. Double-click the bus name and rename to *StreamDeck2Daw*
5. Click *+* to add a second *Bus*
6. Double-click the second bus name and rename to *Daw2StreamDeck*
7. Ensure that *Device is online* is checked
8. Click *Apply*

### Enable Virtual MIDI ports

1. Open Ableton Live
2. Open *Settings* > *Link, Tempo & MIDI*
3. Under *Input Ports*, locate *IAC Driver (StreamDeck2Daw)* and select the *Track* and *Remote* checkboxes
4. Under *Input Ports*, locate *IAC Driver (Daw2StreamDeck)* and select the *Track* and *Remote* checkboxes
