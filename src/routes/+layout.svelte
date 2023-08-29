<script>
	import Header from './Header.svelte';
	import ScoreBoard from './ScoreBoard.svelte';
	import './styles.css';
	import { SvelteUIProvider } from '@svelteuidev/core';
</script>

<SvelteUIProvider>
	<div class="app">
		<Header />

		<main>
			<slot />
		</main>

		<footer>
			<p>番數表: <a href="http://www.twmahjong.com/">http://www.twmahjong.com/</a></p>
		</footer>
		<ScoreBoard/>
	</div>
</SvelteUIProvider>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
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

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
