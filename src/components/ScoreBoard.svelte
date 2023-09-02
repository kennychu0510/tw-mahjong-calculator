<script lang="ts">
	import { Button, Space, Text } from '@svelteuidev/core';
	import { fade, fly } from 'svelte/transition';
	import { calculatorStore } from '../store/Calculator';
	import ScoreBadge from './ScoreBadge.svelte';
	import Icon from '@iconify/svelte';
	import AddScoreForm from './AddScoreForm.svelte';

	let isAddScorePage = false;

	type ScoreList = {
		name: string;
		points: number;
	}[];
	let opened = false;
	let listOfScores: ScoreList = [];

	calculatorStore.subscribe((store) => {
		const list: ScoreList = [];
		for (let [key, item] of store.scores) {
			list.push({
				name: item.name,
				points: Number(item.points)
			});
		}
		listOfScores = list.sort((a, b) => a.points - b.points);
	});

	function openModal() {
		opened = true;
	}

	function closeModal() {
		opened = false;
		isAddScorePage = false;
	}

	function reset() {
		calculatorStore.set({
			scores: new Map(),
			totalPoints: 0
		});
	}

	function addScore() {
		isAddScorePage = true;
	}
</script>

<div class="score-board" on:click={openModal}>
	<div class="content-container">
		<Text size="xl">{$calculatorStore.totalPoints}</Text>
		<Space w={5} />
		<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>番</Text>
	</div>
</div>

{#if opened}
	<div class="backdrop" transition:fade on:click={closeModal}>
		<div
			class="modal"
			transition:fly={{ y: 100 }}
			on:introstart
			on:outroend
			on:click|stopPropagation={() => {}}
		>
			{#if isAddScorePage}
				<AddScoreForm
					onBack={() => {
						isAddScorePage = false;
					}}
					onClose={() => {
						opened = false;
					}}
				/>
			{:else}
				<div class="score-summary" in:fly={{ x: -100 }}>
					<div class="content-container">
						<Text size="xl">{$calculatorStore.totalPoints}</Text>
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
						{#if $calculatorStore.scores.size > 0}
							<Button on:click={addScore} color="green" size="sm" on:click={addScore}
								><Icon icon="fluent:add-12-filled" /></Button
							>
						{/if}
					</div>
				</div>
			{/if}
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
