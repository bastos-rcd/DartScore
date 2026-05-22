import { db } from '@/services/db'

import type { Player } from '@/models/player'

export const playerService = {
	async getPlayers(): Promise<Player[]> {
		return await db.users.toArray()
	},
}
