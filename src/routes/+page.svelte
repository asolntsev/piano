<script>
  import Note from '$lib/Note.ts';
  import Keyboard from "./Keyboard.svelte";

	const BASE = 260 // actually, 261.63
	const notesEqual = [
		new Note('C', BASE),
		new Note('C#', BASE * Math.pow(2, 1/12)),
		new Note('D', BASE * Math.pow(2, 2/12)),
		new Note('D#', BASE * Math.pow(2, 3/12)),
		new Note('E', BASE * Math.pow(2, 4/12)),
		new Note('F', BASE * Math.pow(2, 5/12)),
		new Note('F#', BASE * Math.pow(2, 6/12)),
		new Note('G', BASE * Math.pow(2, 7/12)),
		new Note('G#', BASE * Math.pow(2, 8/12)),
		new Note('A', BASE * Math.pow(2, 9/12)),
		new Note('A#', BASE * Math.pow(2, 10/12)),
		new Note('B', BASE * Math.pow(2, 11/12)),
		new Note('C2', BASE * 2)
	]

	const notesNatural = [
		new Note('C', BASE),
		new Note('C#', BASE * 16/15),
		new Note('D', BASE * 9/8),
		new Note('D#', BASE * 6/5),
		new Note('E', BASE * 5/4),
		new Note('F', BASE * 4/3),
		new Note('F#', BASE * 45/32),
		new Note('G', BASE * 3/2),
		new Note('G#', BASE * 8/5),
		new Note('A', BASE * 5/3),
		new Note('A#', BASE * 16/9),
		new Note('B', BASE * 15/8),
		new Note('C2', BASE * 2),
	]
	
	const upperKeyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8] // 1 2 3 4 5 6 7 8 9 0 - = Backspace
	const downKeyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 13] // q w e r t y u i o p [ ] Enter

	$: notesN = (size) => {
		return [ ...Array(size + 1).keys() ].map(i => new Note(`2^${i}/${size}`, BASE * Math.pow(2, i/size)))
	}
	
	function diffWithG(notes) {
		let minimalError = 2
		for (let i = 1; i < notes.length; i++) {
			const noteError = Math.abs(1.5 - notes[i].frequency / notes[0].frequency)
			minimalError = Math.min(minimalError, noteError)
		}
		return minimalError
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Piano principles" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			PIANO
		</span>
	</h1>

	<div class="row">
		<Keyboard name="Pure intonation" notes={notesNatural} keyCodes={upperKeyCodes}/>
	</div>

	<div class="row">
		<Keyboard name="Equal temperament" notes={notesEqual} keyCodes={downKeyCodes}/>
	</div>

	{#each [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 51, 53] as size}
		<div class="row">
			<Keyboard name={`Equal temperament with ${size} notes  =>  diff with G: ${diffWithG(notesN(size)).toFixed(3)}`} notes={notesN(size)}/>
		</div>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
	
	.row {
		display: flex;
		flex-direction: column;
		margin: 10px;
		padding: 10px;
	}

</style>
