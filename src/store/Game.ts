import { writable } from 'svelte/store';
import { Position, type IGame } from '../types';

export const gameStore = writable<IGame>({
	players: [
		{
			key: Position.N,
			name: 'north',
			position: Position.N
		},
		{
			key: Position.E,
			name: 'east',
			position: Position.E
		},
		{
			key: Position.S,
			name: 'south',
			position: Position.S
		},
		{
			key: Position.W,
			name: 'west',
			position: Position.W
		},
	],
	results: [
		{
			   round: 1,
				 winningCombo: [],
				 winningDetails: {
					mode: 'receive',
					playerKey: Position.N,
				},
				 playerScores: [
					{
						playerKey: Position.N,
						value: 100,
						
					},
					{
						playerKey: Position.E,
						value: 0,
					},
					{
						playerKey: Position.S,
						value: 50,
					},
					{
						playerKey: Position.W,
						value: 50,
					},
				 ]
		},
		{
			   round: 2,
				 winningCombo: [],
				 winningDetails: {
					mode: 'receive',
					playerKey: Position.E,
				},
				 playerScores: [
					{
						playerKey: Position.N,
						value: -100,
					},
					{
						playerKey: Position.E,
						value: 20,
					},
					{
						playerKey: Position.S,
						value: 0,
					},
					{
						playerKey: Position.W,
						value: 20,
					},
				 ]
		},
	]
});
