<script>
    export let name = "";
    export let notes = [];
    export let keyCodes = []

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
    }

    function showRatio() {
        clearTimeout(hideRatioTimer)
        const playingNotes = Object.keys(playing).filter(note => !!playing[note]);
        if (playingNotes.length === 2) {
            ratio = calculateRatio(playing[playingNotes[0]].frequency.value, playing[playingNotes[1]].frequency.value)
        }
        else {
            hideRatio()
        }
    }

    function calculateRatio(note1, note2) {
        return (note1 > note2) ? (note1 / note2) : (note2 / note1);
    }

    function hideRatio() {
        hideRatioTimer = setTimeout(() => ratio = null, 200)
    }

    function ratioClass(ratio) {
        const error = Math.min(err(ratio, 0.5), err(ratio, 1), err(ratio, 1.5), err(ratio, 2), err(ratio, 2.5))
        console.log(error)
        if (error < 0.0001) {
            return ''
        }
        if (error < 0.01) {
            return 'small-error'
        }
        if (error >= 0.01) {
            return 'big-error'
        }
        return ''
    }

    function err(a, b) {
        return Math.abs(a - b)
    }

    $: isPlaying = (note) => {
        return !!playing[note.id]
    }

    function onKeyDown(e) {
        const noteIndex = keyCodes.indexOf(e.keyCode);
        if (noteIndex > -1) {
            const note = notes[noteIndex];
            if (!isPlaying(note)) {
                startPlay(note)
            }
        }
    }

    function onKeyUp(e) {
        const noteIndex = keyCodes.indexOf(e.keyCode);
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

<h1>{name}</h1>

<h3>&nbsp; {#if ratio}Ratio: <span class={ratioClass(ratio)}>{ratio.toFixed(3)}</span>{/if} </h3>

<div class="keyboard">
    {#each Object.entries(notes) as [i, note]}
			<span on:mousedown={(e) => mouseDown(note, e)} on:mouseup={(e) => mouseUp(note)}
                  class="key"
                  class:sharp="{note.sharp}"
                  class:disabled="{note.disabled}"
                  class:playing="{isPlaying(note)}"
            >
        {#if !note.disabled}
				  {note.name}
          {note.frequency.toFixed(2)}
          <br/>
          <br/>
          <strong>{1 + parseInt(i)}</strong>
        {/if}
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
    .keyboard .key.disabled {
        background-color: #eee;
        color: #eee;
    }

    .keyboard .key.playing {
        border: 4px solid red;
        background-color: cyan;
    }

    .small-error {
        color: blue;
    }
    .big-error {
        color: red;
    }
</style>
