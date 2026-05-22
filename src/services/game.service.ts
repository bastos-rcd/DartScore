import { db } from '@/services/db'

import type { Game } from '@/models/game'

export const gameService = {
	// async getGames(): Promise<Game[]> {
	// 	return await db.users.toArray()
	// },

	async addGame(game: Game): Promise<string> {
		return await db.games.add(game)
	},
}
