<script>
	import Note from '$lib/Note.ts';
	import Keyboard from "./Keyboard.svelte";

	const LA = 440
	const notesEqual = [
		new Note('A', LA),
		new Note('A#', LA * Math.pow(2, 1/12)),
		new Note('B', LA * Math.pow(2, 2/12)),
		new Note('C', LA * Math.pow(2, 3/12)),
		new Note('C#', LA * Math.pow(2, 4/12)),
		new Note('D', LA * Math.pow(2, 5/12)),
		new Note('D#', LA * Math.pow(2, 6/12)),
		new Note('E', LA * Math.pow(2, 7/12)),
		new Note('F', LA * Math.pow(2, 8/12)),
		new Note('F#', LA * Math.pow(2, 9/12)),
		new Note('G', LA * Math.pow(2, 10/12)),
		new Note('G#', LA * Math.pow(2, 11/12)),
		new Note('A2', LA * 2),
		// new Note('A2#', LA * 2 * Math.pow(2, 1/12)),
		// new Note('B2', LA * 2 * Math.pow(2, 2/12)),
		// new Note('B2#', LA * 2 * Math.pow(2, 3/12)),
		// new Note('C2', LA * 2 * Math.pow(2, 4/12)),
	]

	const notesNatural = [
		new Note('A', LA),
		new Note('A#', LA * 16/15),
		new Note('B', LA * 9/8),
		new Note('C', LA * 6/5),
		new Note('C#', LA * 5/4),
		new Note('D', LA * 4/3),
		new Note('D#', LA * 45/32),
		new Note('E', LA * 3/2),
		new Note('F', LA * 8/5),
		new Note('F#', LA * 5/3),
		new Note('G', LA * 16/9),
		new Note('G#', LA * 15/8),
		new Note('A2', LA * 2),
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
