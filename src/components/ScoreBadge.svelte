<script lang="ts">
	import { Badge, Flex, Group, Space, Text, createStyles } from '@svelteuidev/core';
	export let score: {
		name: string;
		points: number;
	};

  const useStyles = createStyles(() => ({
		item: {
			margin: 5
		}
	}))

  function getBadgeColor(points: number) {
    if (points < 10) return 'green'
    if (points < 30) return 'teal'
    if (points < 50) return 'yellow'
    if (points < 70) return 'orange'
    return 'red'
  }
  const color = getBadgeColor(score.points)
  $: ({classes} = useStyles())
</script>

<Badge color={color} size='lg' class={classes.item}>
		{score.name}
	<svelte:fragment slot="rightSection">
		{score.points}
	</svelte:fragment>
</Badge>
