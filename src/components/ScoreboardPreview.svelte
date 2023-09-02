<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import ScoreBadge from './ScoreBadge.svelte';
	import { Space, Text } from '@svelteuidev/core';
	import { gameStore } from '../store/Game';

	export let round: number;
	export let onClose: () => void;
	$: gameRound = $gameStore.results.at(round - 1);
	$: listOfScores = gameRound?.winningCombo.map((item) => ({
		name: item.name,
		points: Number(item.points)
	}));
	$: totalScore = listOfScores?.reduce((a, b) => a + b.points, 0);
	$: playerKey = gameRound?.winningDetails.playerKey as keyof typeof $gameStore.players;
	$: eatType = gameRound?.winningDetails.mode === 'self' ? '自摸' : '食';
	$: loserKey = gameRound?.winningDetails.loser as keyof typeof $gameStore.players;
	$: loser = loserKey ? $gameStore.players[loserKey].name : '';
</script>

<div class="backdrop" transition:fade on:click={onClose}>
	<div
		class="modal"
		transition:fly={{ y: 100 }}
		on:introstart
		on:outroend
		on:click|stopPropagation={() => {}}
	>
		{#if !!gameRound && !!listOfScores}
			<div class="score-summary" in:fly={{ x: -100 }}>
				<div class="center">
					<Text>
						第{round}局
					</Text>
				</div>
				<div class="content-container">
					<Text size="xl">{$gameStore.players[playerKey].name}</Text>
					<Space w={5} />
					<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}
						>{eatType}</Text
					>
					<Space w={5} />
					{#if gameRound.winningDetails.mode === 'receive'}
						<Text size="xl">{loser}</Text>
						<Space w={5} />
					{/if}
					<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}
						>{totalScore}</Text
					>
					<Space w={5} />
					<Text size="xl">番</Text>
				</div>
				<div class="score-list-container">
					{#each listOfScores as score}
						<ScoreBadge {score} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.center {
		display: flex;
		justify-content: center;
	}
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

	.modal {
		position: fixed;
		top: 50%;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 10px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.score-list-container {
		flex-grow: 1;
	}
	.button-container {
		padding: 10px;
		display: flex;
		justify-content: space-between;
	}

	.score-summary {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
