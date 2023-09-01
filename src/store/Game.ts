import { writable } from 'svelte/store';
import { Position, type IGame } from '../types';

export const gameStore = writable<IGame>({
	players: {
		N: {
			key: Position.N,
			name: ''
		},
		E: {
			key: Position.E,
			name: ''
		},
		S: {
			key: Position.S,
			name: ''
		},
		W: {
			key: Position.W,
			name: ''
		}
	},
	results: []
});
