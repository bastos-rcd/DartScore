import type { Game } from '@/models/game'

import api from '@/services/api'

export const gameService = {
	findAll: async (): Promise<Game[]> => {
		const { data } = await api.get('/games')

		return data
	},

	findById: async (id: string): Promise<Game> => {
		const { data } = await api.get(`/games/${id}`)

		return data
	},

	create: async (game: Partial<Game>): Promise<Game> => {
		const { data } = await api.post('/games', game)

		return data
	},

	remove: async (id: string): Promise<void> => {
		await api.delete(`/games/${id}`)
	},
}
