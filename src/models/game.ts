import type { Player } from './player'

export interface Game {
	id: string
	classment: { player: Player; score: number }[]
	date: string
}
