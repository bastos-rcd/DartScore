import type { Player } from '@/models/player'

import api from '@/services/api'

export const playerService = {
	findAll: async (): Promise<Player[]> => {
		const { data } = await api.get('/players')

		return data
	},

	findById: async (id: string): Promise<Player> => {
		const { data } = await api.get(`/players/${id}`)

		return data
	},

	create: async (player: Partial<Player>): Promise<Player> => {
		const { data } = await api.post('/players', player)

		return data
	},

	update: async (player: Partial<Player>): Promise<Player> => {
		const { data } = await api.put(`/players/${player.id}`, player)

		return data
	},

	remove: async (id: string): Promise<void> => {
		await api.delete(`/players/${id}`)
	},
}
