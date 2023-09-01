import { writable } from 'svelte/store';
import { Position, type IGame } from '../types';

export const gameStore = writable<IGame>({
	players: {
		N: {
			key: Position.N,
			name: 'Chan'
		},
		E: {
			key: Position.E,
			name: 'Wong'
		},
		S: {
			key: Position.S,
			name: 'Lee'
		},
		W: {
			key: Position.W,
			name: 'Ho'
		}
	},
	results: [
		{
			round: 1,
			winningCombo: [],
			winningDetails: {
				mode: 'receive',
				playerKey: Position.N
			},
			playerScores: [
				{
					playerKey: Position.N,
					value: 100
				},
				{
					playerKey: Position.E,
					value: 0
				},
				{
					playerKey: Position.S,
					value: 50
				},
				{
					playerKey: Position.W,
					value: 50
				}
			]
		},
		{
			round: 2,
			winningCombo: [],
			winningDetails: {
				mode: 'receive',
				playerKey: Position.E
			},
			playerScores: [
				{
					playerKey: Position.N,
					value: -100
				},
				{
					playerKey: Position.E,
					value: 20
				},
				{
					playerKey: Position.S,
					value: 0
				},
				{
					playerKey: Position.W,
					value: 20
				}
			]
		}
	]
});
