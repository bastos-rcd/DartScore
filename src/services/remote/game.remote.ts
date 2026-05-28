import { db } from '@/services/remote/pocketbase'
import type { IGameService } from '@/services/interface'

import type { Game } from '@/models/game'

export const gameRemoteService: IGameService = {
	async getGames(): Promise<Game[]> {
		return await db.collection('games').getFullList<Game>({
			requestKey: null,
		})
	},

	async addGame(game): Promise<string> {
		const record = await db.collection('games').create({
			classment: game.classment,
			date: game.date,
		})
		return record.id
	},

	getLiveGames(callback) {
		gameRemoteService
			.getGames()
			.then(callback)
			.catch((err) => {
				console.error('Error fetching games:', err)
			})

		db.collection('games').subscribe('*', async () => {
			const data = await gameRemoteService.getGames()
			callback(data)
		})

		return () => {
			db.collection('games').unsubscribe('*')
		}
	},
}
