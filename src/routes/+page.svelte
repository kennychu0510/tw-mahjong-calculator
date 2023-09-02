<script>
	import ScoreBoard from '../components/ScoreBoard.svelte';
	import ScrollToTop from '../components/ScrollToTop.svelte';
	import Calculator from './Calculator.svelte';
</script>

<svelte:head>
	<title>Mahjong Calculator</title>
	<meta name="Mahjong calculator" content="TW Mahjong Calculator" />
</svelte:head>

<section>
	<Calculator />
	<ScrollToTop />
	<ScoreBoard />
</section>
<footer>
	<p>番數表: <a href="http://www.twmahjong.com/">http://www.twmahjong.com/</a></p>
</footer>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0.6;
		max-width: 1440px;
		margin: 0 auto;
		width: 100%;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}
</style>
