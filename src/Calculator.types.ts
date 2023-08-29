export type Score = {
  name: string;
  points: string;
  description: string;
  type: string
}

export type ICalculator = {
  scores: Score[]
}