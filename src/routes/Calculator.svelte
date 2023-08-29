<script lang="ts">
	import data from '$lib/data/tw-mahjong-scores.json';
	import { Grid, Text } from '@svelteuidev/core';
	import AddButton from '../components/AddButton.svelte';

</script>

<div class="calculator">
	<Grid class="grid">
		<Grid.Col span={4}>
			<div class="row-item">
				<Text weight="bold">番名</Text>
			</div>
		</Grid.Col>
		<Grid.Col span={2}>
			<div class="row-item points">
				<Text weight="bold">番數</Text>
			</div>
		</Grid.Col>
		<Grid.Col span={4}>
			<div class="row-item">
				<Text weight="bold">解說</Text>
			</div>
		</Grid.Col>
		<Grid.Col span={2}>
			<div class="row-item" />
		</Grid.Col>
		{#each data as item}
			<Grid.Col span={4}>
				<div class="row-item">
					<Text>{item.name}</Text>
				</div>
			</Grid.Col>
			<Grid.Col span={2}>
				<div class="row-item points">
					<Text>{item.points}</Text>
				</div>
			</Grid.Col>
			<Grid.Col span={4}>
				<div class="row-item">
					<Text>{item.description}</Text>
				</div>
			</Grid.Col>
			<Grid.Col span={2}>
				<div class="row-item">
					<AddButton {item} />
				</div>
			</Grid.Col>
		{/each}
	</Grid>
</div>

<style>
	.calculator {
		width: 100%;
	}
	.row-item {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
	}

	.points {
		align-items: center;
	}
</style>
