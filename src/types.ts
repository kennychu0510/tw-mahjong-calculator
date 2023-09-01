export type Score = {
	name: string;
	points: string;
	description: string;
	type: string;
};

export type ICalculator = {
	scores: Score[];
};

export enum Position {
	N = 'N',
	E = 'E',
	S = 'S',
	W = 'W'
}

export type PlayerScore = {
  value: number;
  playerKey: string
}

type WinningDetails = {
	mode: 'self' | 'receive',
	playerKey: string;
}

export type GameScore = {
	round: number;
  winningCombo: Score[];
  playerScores: PlayerScore[];
	winningDetails: WinningDetails;
};

export interface IPlayer {
	position: Position;
	name: string;
  key: string;
}

export interface IGame {
	players: IPlayer[];
  results: GameScore[];
}

export interface ISettings {
	isOpened: boolean;
}