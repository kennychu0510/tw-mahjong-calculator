<script lang="ts">
	import { Button, Space, Text } from '@svelteuidev/core';
	import { spring } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import { calculatorStore } from '../store/Calculator';
	import ScoreBadge from './ScoreBadge.svelte';
	import Icon from '@iconify/svelte';

	type ScoreList = {
		name: string;
		points: number;
	}[];
	let totalScore = 0;
	let opened = false;
	let listOfScores: ScoreList = [];
	const displayedScore = spring();

	calculatorStore.subscribe((store) => {
		totalScore = store.totalPoints;
		const list: ScoreList = [];
		for (let [key, item] of store.scores) {
			list.push({
				name: item.name,
				points: Number(item.points)
			});
		}
		listOfScores = list.sort((a, b) => a.points - b.points);
	});

	$: displayedScore.set(totalScore);

	function openModal() {
		opened = true;
	}

	function closeModal() {
		opened = false;
	}

	function reset() {
		calculatorStore.set({
			scores: new Map(),
			totalPoints: 0
		});
	}
</script>

<div class="score-board" on:click={openModal}>
	<div class="content-container">
		<Text size="xl">{totalScore}</Text>
		<Space w={5} />
		<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>番</Text>
	</div>
</div>

{#if opened}
	<div class="backdrop" transition:fade on:click={closeModal}>
		<div
			class="modal"
			transition:fly={{ y: 50 }}
			on:introstart
			on:outroend
			on:click|stopPropagation={() => {}}
		>
			<div class="content-container">
				<Text size="xl">{totalScore}</Text>
				<Space w={5} />
				<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}
					>番</Text
				>
			</div>
			<div class="score-list-container">
				{#each listOfScores as score}
					<ScoreBadge {score} />
				{/each}
			</div>
			<div class="button-container">
				<Button on:click={reset} color="red" size="sm"
					><Icon icon="tabler:trash" width="20" height="20" /></Button
				>
			</div>
		</div>
	</div>
{/if}

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
</style>
