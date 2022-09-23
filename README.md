# m4l-devices

Max4Live devices.

## RST - Resample Selected Track

When jamming with soft synths or hardware synths, MIDI notes are driving that synth. Recording into the instrument channel would therefore record the MIDI input rather than the audio output. When recorded MIDI is played back at a later date, the sound is often different to what was originally played, due to some combination of synth settings not being saved with the MIDI input (this is especially the case with hardware synths). In this instance it's better to capture the audio output rather than the MIDI input. For synths that don't have MIDI input, audio capture is the only choice.

On the Push2, creation of a track-based audio (or MIDI) resampling track necessitates multiple button presses and two hands. This interrupts the creative flow as it requires extensive hand-eye coordination:

1. Press 'Mix'
2. Press 'Mix'
3. Press to select 'Input & Output'
4. Scroll to select 'Input Type'
5. Press Record + Track Select
6. Rename new track in software
7. Recolour new track

Key/MIDI mapping RST's BEFORE and AFTER buttons automates this process:

1. RST inserts a new track BEFORE (to the left of) or AFTER (to the right of) the selected track
2. RST matches the type of the new track to the type of the selected track (Audio or MIDI)
3. RST sets the input of the new track to the name of the selected track
4. RST arms the new track
5. RST names the new track to indicate the source name and the time of creation
6. RST recolours the new track to match the source colour

Recording can now be started via a single button press on the desired clip slot.

Note: This patch is functionally similar to ClyphX Pro's `INSAUDIO`/`INSMIDI`.

---

## Reading

* [Ableton Max For Live Beginner's Masterclass with Phelan Kane](https://www.youtube.com/watch?v=tkXz8sf-KwU&t=751s)
* [Learning The Live Object Model and Creating 0dB Max](https://www.youtube.com/watch?v=agtnMQkDjUE)
* [Traversing the Ableton Live Object Model](https://www.youtube.com/watch?v=qeabaagMZr8)
* [Mira](https://cycling74.com/products/mira/)
* [JavaScript Live API Tutorials](http://compusition.com/writings/js-live-api)
* [LOM - The Live Object Model](https://docs.cycling74.com/max8/vignettes/live_object_model)
* [Max JS Require Guide](https://docs.cycling74.com/max8/vignettes/jsrequire)
* [Max JS Reference - Arguments](https://docs.cycling74.com/max8/refpages/js#jsarguments)
