import { db } from '@/services/remote/pocketbase'
import type { IPlayerService } from '@/services/interface'

import type { Player } from '@/models/player'

export const playerRemoteService: IPlayerService = {
	async getPlayers(): Promise<Player[]> {
		return await db
			.collection('players')
			.getFullList<Player>({ requestKey: null })
	},

	async addPlayer(player): Promise<string> {
		const record = await db.collection('players').create({
			name: player.name,
		})
		return record.id
	},

	async removePlayer(player): Promise<void> {
		await db.collection('players').delete(player.id)
	},

	getLivePlayers(callback) {
		playerRemoteService
			.getPlayers()
			.then(callback)
			.catch((err) => {
				console.error('Error fetching players:', err)
			})

		db.collection('players').subscribe('*', async () => {
			const data = await playerRemoteService.getPlayers()
			callback(data)
		})

		return () => {
			db.collection('players').unsubscribe('*')
		}
	},
}
