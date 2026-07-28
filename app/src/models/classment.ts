import type { Player } from '@/models/player'

export interface Classment {
	player: Player
	score: number
	podium: number
	played: number
}
