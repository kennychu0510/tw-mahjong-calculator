<script lang="ts">
	import { Space, Text, Modal, Flex , createStyles} from '@svelteuidev/core';
	import { calculatorStore } from '../routes/Calculator.Service';
	import { spring } from 'svelte/motion';
	import ScoreBadge from './ScoreBadge.svelte';
	import { get } from 'svelte/store';



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
		listOfScores = list.sort((a, b) => a.points - b.points)
	});

	$: displayedScore.set(totalScore);

	function openModal() {
		opened = true;
	}

	function closeModal() {
		opened = false;
	}


</script>

<div class="score-board" on:click={openModal}>
	<div class="content-container">
		<Text size="xl">{totalScore}</Text>
		<Space w={5} />
		<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>番</Text>
	</div>
</div>

<Modal {opened} on:close={closeModal}>
	<div class="content-container">
		<Text size="xl">{totalScore}</Text>
		<Space w={5} />
		<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>番</Text>
	</div>
	<div class="score-list-container">
		<!-- <Flex gap={10} wrap={true}> -->
			{#each listOfScores as score}
				<ScoreBadge {score}/>
			{/each}
		<!-- </Flex> -->

	</div>
</Modal>

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

	.item {
		padding: 10px;
	}
</style>
