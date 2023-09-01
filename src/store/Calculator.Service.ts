import { writable } from 'svelte/store';
import type { Score } from '../types';

export const calculatorStore = writable<{
	scores: Map<string, Score>;
	totalPoints: number;
}>({
	scores: new Map(),
	totalPoints: 0
});

export function addScoreHelper(current: number, item: Score): number {
	if (item.type === 'normal') {
		return current + Number(item.points);
	}
	return current;
}

export function subtractScoreHelper(current: number, item: Score): number {
	if (item.type === 'normal') {
		return current - Number(item.points);
	}
	return current;
}
