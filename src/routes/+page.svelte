<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	let context;
	const playing = {}

	function startPlay(note) {
		context = context || new AudioContext();

		const o = context.createOscillator();
		o.type = 'sine'
		o.frequency.value = notes[note];
		// const g = context.createGain()
		// o.connect(g)
		o.connect(context.destination)
		o.start(0)
		const high = notes[note]
		playing[note] = o
	}
	
	function stopPlay(note) {
		const o = playing[note]
		setTimeout(() => {o?.stop(0)})
		delete playing[note]
	}
	
	/*
	https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B2%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%D0%BD%D0%BE_%D1%82%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9_%D1%81%D1%82%D1%80%D0%BE%D0%B9
	 */
	const notes = {
		'C4': 261.63,
		'D4': 293.67,
		'E4': 329.63,
		'F4': 349.23,
		'G4': 392.00,
		'A4': 440.00,
		'B4': 493.88,
		'C5': 523.25,
		'D5': 587.33,
		'E5': 659.26,
		'F5': 698.46,
		'G5': 783.99,
		'A5': 880.00,
		'B5': 987.77,
	}
	
	function high() {
		// Можно математически вычислить частоты для всего звукоряда, пользуясь формулой:
		// f(i) = f0 * 2^(i/12)
		// где f0 — частота камертона (например Ля 440 Hz), 
		// а i — количество полутонов в интервале от исследуемого звука к эталону f0.
		
		/*
		Выбор значения n = 12 в качестве основного обусловлен тем, что для акустически чистого звучания многоголосных музыкальных произведений особенно важно чистое звучание квинт (как наиболее «консонансных», не считая октавы, интервалов), а в идеале соотношение частот образующих квинту нот должно равняться 3/2. При РТ «квинта» для каждого n отвечает такому числу k, 
		что 
		, и перебором можно проверить, что при n = 12 (с k = 7 — это ближайшее целое к ln(3/2)/ln(2)n) достигается лучшее приближение, нежели при меньших или несколько бóльших n (точнее было бы при n = 41 или n = 53, но слишком большие n неудобны с практической точки зрения)
		 */
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />

	{#each Object.entries(notes) as [note, high]}
		<div on:mousedown={() => startPlay(note)} on:mouseup={() => stopPlay(note)}>{note}</div>
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
</style>
