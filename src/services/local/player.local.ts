import { liveQuery } from 'dexie'

import { db } from '@/services/local/indexdb'
import type { IPlayerService } from '@/services/interface'

import type { Player } from '@/models/player'

export const playerLocalService: IPlayerService = {
	async getPlayers(): Promise<Player[]> {
		return await db.players.toArray()
	},

	async addPlayer(player: Player): Promise<string> {
		return await db.players.add(player)
	},

	async removePlayer(player: Player): Promise<void> {
		await db.players.delete(player.id)
	},

	getLivePlayers(callback) {
		const observable = liveQuery(() => db.players.toArray())
		const subscription = observable.subscribe({
			next: (result) => callback(result),
		})
		return () => subscription.unsubscribe()
	},
}
