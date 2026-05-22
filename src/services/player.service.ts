import { db } from '@/services/db'

import type { Player } from '@/models/player'

export const playerService = {
	async getPlayers(): Promise<Player[]> {
		return await db.users.toArray()
	},

	async addPlayer(player: Player): Promise<string> {
		return await db.users.add(player)
	},

	async removePlayer(player: Player): Promise<void> {
		await db.users.delete(player.id)
	},
}
