import { liveQuery } from 'dexie'

import { db } from '@/services/local/indexdb'
import type { IGameService } from '@/services/interface'

import type { Game } from '@/models/game'

export const gameLocalService: IGameService = {
	async getGames(): Promise<Game[]> {
		return await db.games.toArray()
	},

	async addGame(game: Game): Promise<string> {
		return await db.games.add(game)
	},

	getLiveGames(callback) {
		const observable = liveQuery(() => db.games.toArray())
		const subscription = observable.subscribe({
			next: (result) => callback(result),
		})
		return () => subscription.unsubscribe()
	},
}
