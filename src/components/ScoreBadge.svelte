<script lang="ts">
	import { Badge, createStyles } from '@svelteuidev/core';
	import { calculatorStore } from '../store/Calculator';
	export let score: {
		name: string;
		points: number;
	};

	const useStyles = createStyles(() => ({
		item: {
			margin: 5
		}
	}));

	function getBadgeColor(points: number) {
		if (points < 10) return 'green';
		if (points < 30) return 'teal';
		if (points < 50) return 'yellow';
		if (points < 70) return 'orange';
		return 'red';
	}
	const color = getBadgeColor(score.points);
	$: ({ classes } = useStyles());

	function removeScore() {
		calculatorStore.update((state) => {
			const scores = new Map(state.scores);
			scores.delete(score.name);
			const totalPoints = state.totalPoints - score.points;
			return {
				scores,
				totalPoints
			};
		});
	}
</script>

<Badge {color} size="lg" class={classes.item} on:click={removeScore} >
	{score.name}
	<svelte:fragment slot="rightSection">
		{score.points}
	</svelte:fragment>
</Badge>
