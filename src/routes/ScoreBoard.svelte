<script lang="ts">
	import { Space, Text } from '@svelteuidev/core';
	import { calculatorStore } from './Calculator.Service';
	import { spring } from 'svelte/motion';

	let totalScore = 0;
	const displayedScore = spring();

	calculatorStore.subscribe((store) => {
		totalScore = store.totalPoints
	});

	$: displayedScore.set(totalScore);

</script>

<div class="score-board">
	<div class="content-container">
			<Text size="xl">{totalScore}</Text>
		<Space w={5} />
		<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>番</Text>
	</div>
</div>

<style>
	.score-board {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.content-container {
		background-color: #fff;
		padding: 10px;
		min-width: 100px;
		display: flex;
		justify-content: center;
		border-radius: 10px 10px 0 0;
		opacity: 0.9;
	}
</style>
