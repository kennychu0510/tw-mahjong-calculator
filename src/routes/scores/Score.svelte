<script lang="ts">
	import { get } from 'svelte/store';
	import { gameStore } from '../../store/Game';
	import Result from './Result.svelte';
	import { Text } from '@svelteuidev/core';
	import { openSettings } from '../../store/Settings';
</script>

<div>
	{#if $gameStore.players === null}
		<div class="no-players-container">
			<Text underline={true} on:click={openSettings}>請輸入玩家</Text>
		</div>
	{:else}
		<table>
			<tr>
				<th>回合</th>
				{#each Object.values($gameStore.players) as player}
					<th>{player.name}</th>
				{/each}
			</tr>
			{#each $gameStore.results as result}
				<Result gameScore={result} />
			{/each}
		</table>
	{/if}
</div>

<style>
	table {
		width: 100%;
	}
	th {
		width: 20%;
	}
	.no-players-container {
		display: flex;
		justify-content: center;
	}
</style>
