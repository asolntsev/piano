<script>
	const LA = 440
	const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

	class Note {
		constructor(id, name, octave, frequency) {
			this.id = id;
			this.name = name;
			this.octave = octave;
			this.frequency = frequency;
		}

		get sharp() {
			return this.name.indexOf('#') > -1;
		}
	}

	let context
	$: playing = {}

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
	}
	
	function stopPlay(note) {
		const o = playing[note.id]
		setTimeout(() => {o?.stop(0)})
		delete playing[note.id]
	}
	
	$: isPlaying = (note) => {
		//console.log('isPlaying', note.id, note.name, !!playing[note.id])
		return !!playing[note.id]
	}
	
	const notes = calculateNotesEqualTemperament()
	const notes2 = calculateNotesNaturalTemperament()
	
	function calculateNotesEqualTemperament() {
		let result = [];
		for (let i = -33; i < 28; i++) {
			result.push(new Note(i, name(i), octave(i), high(i)));
		}
		return result
	}

	function calculateNotesNaturalTemperament() {
		let result = [];
		// TODO
		for (let i = -33; i < 28; i++) {
			result.push(new Note(i, name(i), octave(i), high(i)));
		}
		return result
	}

	function name(i) {
		return noteNames[(i - 3 + 12000) % 12]
	}

	function octave(i) {
		return parseInt((i + 33) / 12)
	}

	function high(i) {
		// Можно математически вычислить частоты для всего звукоряда, пользуясь формулой:
		// f(i) = f0 * 2^(i/12)
		// где f0 — частота камертона (например Ля 440 Hz), 
		// а i — количество полутонов в интервале от исследуемого звука к эталону f0.
		
		/*
		Выбор значения n = 12 в качестве основного обусловлен тем, что для акустически чистого звучания многоголосных музыкальных произведений особенно важно чистое звучание квинт (как наиболее «консонансных», не считая октавы, интервалов), а в идеале соотношение частот образующих квинту нот должно равняться 3/2. При РТ «квинта» для каждого n отвечает такому числу k, 
		что 
		, и перебором можно проверить, что при n = 12 (с k = 7 — это ближайшее целое к ln(3/2)/ln(2)n) достигается лучшее приближение, нежели при меньших или несколько бóльших n (точнее было бы при n = 41 или n = 53, но слишком большие n неудобны с практической точки зрения)
		 */
		//return LA * parseFloat(Math.pow(2, i/12).toFixed(3))
		return LA * Math.pow(2, i/12)
	}

	const computerKeyboard = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8] // 1 2 3 4 5 6 7 8 9 0 - = Backspace

	function onKeyDown(e) {
		// console.log('key', e.keyCode, e)
		const noteIndex = computerKeyboard.indexOf(e.keyCode);
		if (noteIndex > -1) {
			const note = notes[noteIndex + 12];
			if (!isPlaying(note)) {
				startPlay(note)
			}
		}
	}

	function onKeyUp(e) {
		const noteIndex = computerKeyboard.indexOf(e.keyCode);
		if (noteIndex > -1) {
			const note = notes[noteIndex + 12];
			stopPlay(note)
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp}/>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			PIANO
		</span>
	</h1>

	<h1>Equal temperament:</h1>
	<div class="keyboard">
		{#each Object.entries(notes.filter(note => note.id > -10 && note.id < 16)) as [i, note]}
			<span on:mousedown={() => startPlay(note)} on:mouseup={() => stopPlay(note)}
						class="key"
						class:sharp="{note.sharp}"
						class:playing="{isPlaying(note)}"
						style="left: {1000/2 + note.id * 20}px"
			>
				{note.name} {isPlaying(note)}
			</span>
		{/each}
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

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
	
	.keyboard {
		width: 1000px;
		height: 100px;
		border: 1px solid green;
		position: relative;
	}
	
	.keyboard .key {
		border: 1px solid lightgray;
		margin: 0 2px;
		padding: 1px;
		text-align: center;
		width: 30px;
		height: 50px;
		position: absolute;
		top: 30px;
		background-color: white;
	}

	.keyboard .key.sharp {
		top: 5px;
		background-color: black;
		z-index: -1;
	}
	
	.keyboard .key.playing {
		border: 1px solid red;
	}
</style>
