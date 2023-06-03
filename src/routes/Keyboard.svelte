<script>
    export let notes = [];
    export let listen = false
    // const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const computerKeyboard = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8] // 1 2 3 4 5 6 7 8 9 0 - = Backspace

    let context
    $: playing = {}
    let hideRatioTimer
    $: ratio = null

    function startPlay(note) {
        context = context || new AudioContext();

        const o = context.createOscillator();
        o.type = 'sine'
        o.frequency.value = note.frequency;
        // const g = context.createGain()
        // o.connect(g)
        o.connect(context.destination)
        o.start(0)
        playing[note.id] = o
        showRatio();
    }

    function stopPlay(note) {
        const o = playing[note.id]
        setTimeout(() => {o?.stop(0)})
        playing[note.id] = null
        hideRatio()
    }
    
    function showRatio() {
        const playingNotes = Object.keys(playing).filter(note => !!playing[note]);
        if (playingNotes.length === 2) {
            ratio = calculateRatio(playing[playingNotes[0]].frequency.value, playing[playingNotes[1]].frequency.value)
            clearTimeout(hideRatioTimer)
        }
        else {
            hideRatio()
        }
    }
    
    function calculateRatio(note1, note2) {
        return (note1 > note2) ? (note1 / note2) : (note2 / note1);
    }

    function hideRatio() {
        hideRatioTimer = setTimeout(() => ratio = null, 500)
    }

    $: isPlaying = (note) => {
        return !!playing[note.id]
    }

    function onKeyDown(e) {
        if (!listen) return
        const noteIndex = computerKeyboard.indexOf(e.keyCode);
        if (noteIndex > -1) {
            const note = notes[noteIndex];
            if (!isPlaying(note)) {
                startPlay(note)
            }
        }
    }

    function onKeyUp(e) {
        if (!listen) return

        const noteIndex = computerKeyboard.indexOf(e.keyCode);
        if (noteIndex > -1) {
            const note = notes[noteIndex];
            stopPlay(note)
        }
    }
    
    function mouseDown(note) {
        startPlay(note)
    }
    function mouseUp(note) {
        stopPlay(note)
    }
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp}/>

<h3>&nbsp; {#if ratio}Ratio: {ratio.toFixed(3)}{/if} </h3>

<div class="keyboard">
    {#each Object.entries(notes) as [i, note]}
			<span on:mousedown={(e) => mouseDown(note, e)} on:mouseup={(e) => mouseUp(note)}
                  class="key"
                  class:sharp="{note.sharp}"
                  class:playing="{isPlaying(note)}"
            >
				{note.name}
                {note.frequency.toFixed(2)}
                <br/>
                <br/>
                <strong>{1 + parseInt(i)}</strong>
			</span>
    {/each}
</div>

<style>
    .keyboard {
        width: 1000px;
        height: 100px;
        border: 1px solid darkgray;
        display: flex;
    }

    .keyboard .key {
        margin: 0 2px;
        padding: 1px;
        text-align: center;
        width: 60px;
        height: 90px;
        top: 30px;
        background-color: white;
        border: 4px solid white;
        border-radius: 5px;
    }

    .keyboard .key.sharp {
        top: 5px;
        background-color: black;
        color: white;
    }

    .keyboard .key.playing {
        border: 4px solid red;
        background-color: cyan;
    }
</style>
