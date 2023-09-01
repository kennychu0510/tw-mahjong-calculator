<script lang="ts">
	import type { GameScore, IPlayer } from '../../types';
	import { gameStore } from '../../store/Game';
	export let gameScore: GameScore;

	function isWinner(player: IPlayer) {
		return gameScore.winningDetails.playerKey === player.key;
	}
</script>

<tr>
	<td>{gameScore.round}</td>
	{#each $gameStore.players as player}
		{#if isWinner(player)}
			<td class="winner">{gameScore.playerScores.find((item) => item.playerKey === player.key)?.value}</td>
		{:else}
			<td class="loser">{gameScore.playerScores.find((item) => item.playerKey === player.key)?.value}</td>
		{/if}
	{/each}
</tr>

<style>
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
