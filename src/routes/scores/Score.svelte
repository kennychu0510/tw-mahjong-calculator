<script lang="ts">
	import { get } from 'svelte/store';
	import { gameStore } from '../../store/Game';
	import Result from './Result.svelte';
	import { Text } from '@svelteuidev/core';
	import { openSettings } from '../../store/Settings';
</script>

<div class="container">
	<div class="scores">
		{#if Object.values($gameStore.players).every((player) => !player.name)}
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
  <div class="spacer"></div>
  {#if $gameStore.results.length > 0}
	<table class="summary-table">
    <th>總數</th>
		{#each Object.values($gameStore.players) as player}
			<th class="total">{$gameStore.results.reduce((a, b) => {
        const roundScore = b.playerScores.find(item => item.playerKey === player.key)
        if (roundScore) {
          return a + roundScore.value
        }
        return a
      }, 0)}</th>
		{/each}
	</table>
  {/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
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
  .total {
    text-decoration: underline;
  }

</style>
