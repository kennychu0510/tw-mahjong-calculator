import { writable } from 'svelte/store';
import { Position, type IGame } from '../types';
import { persisted } from 'svelte-local-storage-store';

export const gameStore = persisted<IGame>('gameRecord', {
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

// export const gameStore = writable<IGame>({
// 	players: {
// 		N: {
// 			key: Position.N,
// 			name: ''
// 		},
// 		E: {
// 			key: Position.E,
// 			name: ''
// 		},
// 		S: {
// 			key: Position.S,
// 			name: ''
// 		},
// 		W: {
// 			key: Position.W,
// 			name: ''
// 		}
// 	},
// 	results: []
// });
