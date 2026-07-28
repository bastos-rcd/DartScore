import type { Player } from '@/models/player'

export interface Killer {
	player: Player
	number: number | null
	hits: number
	lives: number
}
