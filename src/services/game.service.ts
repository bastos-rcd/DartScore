import { db } from '@/services/db'

import type { Game } from '@/models/game'

export const gameService = {
	async getGames(): Promise<Game[]> {
		return await db.games.toArray()
	},

	async addGame(game: Game): Promise<string> {
		return await db.games.add(game)
	},
}
