<script lang="ts">
	import { fly } from 'svelte/transition';
	import { calculatorStore } from '../store/Calculator';
	import { gameStore } from '../store/Game';
	import { Button, Text, Space, NativeSelect, Tabs, Checkbox, Radio } from '@svelteuidev/core';
	import Icon from '@iconify/svelte';
	import type { IPlayer, PlayerScore } from '../types';
	import Color from '../colors';

	export let onBack: () => void;
  export let onClose: () => void;
	let eatMode = 0;
	let winnerKey = '';
	let loserKey = '';

	function onSave() {
    const mode = eatMode === 0 ? 'receive' : 'self'
		const playerScores: PlayerScore[] = Object.values($gameStore.players).map((player) => {
      let value = 0;
      if (mode === 'self') {
        if (player.key === winnerKey) {
          value = $calculatorStore.totalPoints
        } else {
          value = -$calculatorStore.totalPoints
        }
      } else {
        if (player.key === winnerKey) {
          value = $calculatorStore.totalPoints
        } else if (player.key === loserKey){
          value = -$calculatorStore.totalPoints
        }
      }
      const result = {
        playerKey: player.key,
        value
      }
			return result
		})
		gameStore.update((state) => ({
			...state,
			results: [
				...state.results,
				{
					round: state.results.length + 1,
					winningCombo: Array.from($calculatorStore.scores, ([key, score]) => score),
					playerScores: playerScores,
					winningDetails: {
						playerKey: winnerKey,
						mode
					}
				}
			]
		}));
    calculatorStore.set({
      scores: new Map(),
      totalPoints: 0,
    })
    onClose();
	}

	function onChangeTab(event: any) {
		eatMode = event.detail.index;
	}
	console.log(winnerKey);
</script>

<div in:fly={{ x: 100 }} class="root">
	<div class="score-summary">
		<div class="score">
			<Text size="xl">{$calculatorStore.totalPoints}</Text>
			<Space w={5} />
			<Text size="xl" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 45 }}>番</Text>
		</div>
		<div class="tabs">
			<Tabs bind:eatMode on:change={onChangeTab} color={Color.orange}>
				<Tabs.Tab label={'食'} />
				<Tabs.Tab label={'自摸'} />
			</Tabs>
		</div>
		<table>
			<tr>
				<th />
				<th class="center">{'食家'}</th>
				{#if eatMode === 0}
					<th class="center">{'輸家'}</th>
				{/if}
			</tr>
			{#each Object.values($gameStore.players) as player}
				<tr class="row-item">
					<th>
						{player.name}
					</th>
					{#if eatMode === 1}
						<td class="center">
							<input
								type="radio"
								name={player.key}
								value={player.key}
								color={Color.orange}
								bind:group={winnerKey}
							/>
						</td>
					{:else}
						<td class="center">
							<input
								type="radio"
								name={player.key}
								value={player.key}
								color={Color.orange}
								bind:group={winnerKey}
							/>
						</td>
						<td class="center">
							<input
								type="radio"
								name={player.key}
								value={player.key}
								color={Color.orange}
								bind:group={loserKey}
							/>
						</td>
					{/if}
				</tr>
			{/each}
		</table>
	</div>
	<div class="button-container">
		<Button on:click={onBack} size={'sm'}
			><Icon icon="icon-park-outline:back" width="16" height="16" /></Button
		>
		<Button on:click={onSave} size={'sm'} color='green'
			><Icon icon="material-symbols:save-outline" width="16" height="16" /></Button
		>
	</div>
</div>

<style>
	.root {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.center {
		text-align: center;
	}

	.score {
		padding: 10px;
		min-width: 100px;
		display: flex;
		justify-content: center;
	}

	.score-summary {
		display: flex;
		flex-direction: column;
		flex: 1;
		flex-grow: 1;
	}

	th {
		text-align: left;
	}

	td {
		width: 25%;
		padding: 5px;
	}
	.button-container {
		padding: 10px;
		display: flex;
		justify-content: space-between;
	}
	.tabs {
		display: flex;
		justify-content: center;
	}
	input[type='radio'] {
		/* background: orange; */
		/* accent-color: orange; */
		/* outline: orange; */
	}
</style>
