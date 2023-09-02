<script lang="ts">
	import { Button } from '@svelteuidev/core';
	import { addScoreHelper, calculatorStore, subtractScoreHelper } from '../store/Calculator';
	import type { Score } from '../types';

	export let item: Score;

	let isClicked: boolean;
	calculatorStore.subscribe((store) => {
		isClicked = !!store.scores.get(item.name);
	});

	function removeScore() {
		calculatorStore.update((store) => {
			const updatedStore = store;
			updatedStore.totalPoints = subtractScoreHelper(store.totalPoints, item);
			updatedStore.scores.delete(item.name);
			return updatedStore;
		});
	}

	function addScore() {
		calculatorStore.update((store) => ({
			scores: store.scores.set(item.name, item),
			totalPoints: addScoreHelper(store.totalPoints, item)
		}));
	}
</script>

{#if isClicked}
	<Button
		fullSize
		variant="gradient"
		on:click={removeScore}
		gradient={{ from: 'teal', to: 'blue', deg: 60 }}>✓</Button
	>
{:else}
	<Button
		fullSize
		variant="gradient"
		on:click={addScore}
		gradient={{ from: 'orange', to: 'red', deg: 45 }}>+</Button
	>
{/if}
