<script lang="ts">
	import type { GameScore, IPlayer } from '../../types';
	import { gameStore } from '../../store/Game';
	import ScoreboardPreview from '../../components/ScoreboardPreview.svelte';
	export let gameScore: GameScore;

	let scoreboardPreviewOpen = false;
	function isWinner(player: IPlayer) {
		return gameScore.winningDetails.playerKey === player.key;
	}

	function openDetails() {
		scoreboardPreviewOpen = true;
	}
</script>

<tr>
	<td class="round" on:click={openDetails}>{gameScore.round}</td>
	{#each Object.values($gameStore.players) as player}
		{#if isWinner(player)}
			<td class="winner"
				>{gameScore.playerScores.find((item) => item.playerKey === player.key)?.value}</td
			>
		{:else}
			<td class="loser"
				>{gameScore.playerScores.find((item) => item.playerKey === player.key)?.value}</td
			>
		{/if}
	{/each}
</tr>

{#if scoreboardPreviewOpen}
	<ScoreboardPreview
		onClose={() => {
			scoreboardPreviewOpen = false;
		}}
		round={gameScore.round}
	/>
{/if}

<style>
	.round {
		text-decoration: underline;
	}
	td {
		width: 20%;
		text-align: center;
		padding: 10px 0;
	}

	.winner {
		color: #27d841;
		font-weight: bold;
	}

	.loser {
		color: #d42b2c;
	}
</style>
