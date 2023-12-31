export type Score = {
	name: string;
	points: string;
	description: string;
	type: string;
};

export enum Position {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W'
}

export type PlayerScore = {
	value: number;
	playerKey: string;
};

type WinningDetails = {
	mode: 'self' | 'receive';
	playerKey: string;
	loser?: string;
};

export type GameScore = {
	round: number;
	winningCombo: Score[];
	playerScores: PlayerScore[];
	winningDetails: WinningDetails;
};

export interface IPlayer {
	name: string;
	key: string;
}

export interface IGame {
	players: {
		[Position.N]: IPlayer;
		[Position.E]: IPlayer;
		[Position.S]: IPlayer;
		[Position.W]: IPlayer;
	};
	results: GameScore[];
}

export interface ISettings {
	isOpened: boolean;
}
