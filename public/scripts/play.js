const Synth = Tone.Synth;
const EFFECT_TIMER = 2000;
const ALLOW_WITH_EFFECT = 1;

var context;
window.onload = function() {
    context = new AudioContext();
}

// Main synth to be played.
var synth = new Synth().toMaster();

// Chain an effect every fixed time.
var playedWithEffect = 0;
var effectsInterval = setInterval(runEffect, EFFECT_TIMER);

// Determine starting notes.
var notes = IS_MINOR
    ? getMinorPentatonic(SCALE_NOTE)
    : getMajorPentatonic(SCALE_NOTE);

function getNote(idx) {
    var note = notes[idx % 7];
    if (idx >= 7) note *= 2;
    return note;
}

function triggerAttack(idx) {
    // According to Google's Web Audio recomendation, wait for a
    // user interaction before starting audio playback as user
    // is aware of something happening.
    context.resume();

    if (effects.clean) {
        console.log("cleaning.");
        // Clean effect from current node
        synth.disconnect();
        synth.toMaster();
        effects.clean = false;
    }

    synth.triggerAttack(getNote(idx));
}

function triggerRelease(idx) {
    synth.triggerRelease();

    // Allow only fixed number of notes with effect
    if (effects.on) playedWithEffect++;

    if (playedWithEffect == ALLOW_WITH_EFFECT) {
        setBackground(0);

        playedWithEffect = 0;
        effects.on = false;
        effects.clean = true;
    }
}
