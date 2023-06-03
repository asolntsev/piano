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
	
	$: temperament = 'equal'
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

	<h1>Natural temperament:</h1>
	<div class="row">
		<input type="radio" name="temperament" bind:group={temperament} value="natural"/>
		<Keyboard notes={notesNatural} listen={temperament === 'natural'}/>
	</div>

	<h1>Equal temperament:</h1>
	<div class="row">
		<input type="radio" name="temperament" bind:group={temperament} value="equal"/>
		<Keyboard notes={notesEqual} listen={temperament === 'equal'}/>
	</div>
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

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
</style>
