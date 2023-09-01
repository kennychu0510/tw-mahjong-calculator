<script lang="ts">
	import data from '$lib/data/tw-mahjong-scores.json';
	import { Grid, Text } from '@svelteuidev/core';
	import type { Score } from '../types';
	import AddButton from '../components/AddButton.svelte';
	import Icon from '@iconify/svelte';
	let searchValue = '';
	const sortedData = data.sort((a, b) => {
		if (!b.points && !b.description) return -1;
		if (isNaN(Number(b.points))) return -1;
		return Number(a.points) - Number(b.points);
	});
	$: displayItems = filterItems(sortedData, searchValue);
	const englishCharacterRegex = new RegExp(/^[a-z][a-z0-9]*$/i);
	function filterItems(data: Score[], searchValue: string) {
		if (!searchValue) return data;
		if (englishCharacterRegex.test(searchValue)) return data;
		return data.filter(
			(item) => item.name.includes(searchValue) || item.description.includes(searchValue)
		);
	}
</script>

<div class="search-bar">
	<input bind:value={searchValue} />
	<div class="search-icon">
		<Icon icon="material-symbols:search" width="20" height="20" />
	</div>
</div>
<div class="calculator">
	<Grid class="grid">
		<Grid.Col span={3}>
			<div class="row-item">
				<Text weight="bold">番名</Text>
			</div>
		</Grid.Col>
		<Grid.Col span={2}>
			<div class="row-item points">
				<Text weight="bold">番數</Text>
			</div>
		</Grid.Col>
		<Grid.Col span={5}>
			<div class="row-item">
				<Text weight="bold">解說</Text>
			</div>
		</Grid.Col>
		<Grid.Col span={2}>
			<div class="row-item" />
		</Grid.Col>
		{#each displayItems as item}
			<Grid.Col span={3}>
				<div class="row-item">
					<Text>{item.name}</Text>
				</div>
			</Grid.Col>
			<Grid.Col span={2}>
				<div class="row-item points">
					<Text>{item.points}</Text>
				</div>
			</Grid.Col>
			<Grid.Col span={5}>
				<div class="row-item">
					<Text>{item.description}</Text>
				</div>
			</Grid.Col>
			<Grid.Col span={2}>
				<div class="row-item center">
					{#if !isNaN(Number(item.points)) && !!item.points}
						<div class="add-button-container">
							<AddButton {item} />
						</div>
					{/if}
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
		justify-content: center;
		height: 100%;
	}

	.points {
		align-items: center;
	}

	.center {
		margin: 0 auto;
	}

	.add-button-container {
		width: 50px;
		margin: 0 auto;
	}

	.search-bar {
		margin-bottom: 20px;
		width: 100%;
		position: relative;
	}

	input {
		display: table-cell;
		width: 100%;
		box-sizing: border-box;
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		padding-right: 30px;
		outline: orange;
		height: 28px;
	}

	.search-icon {
		top: 5px;
		right: 8px;
		position: absolute;
	}
</style>
