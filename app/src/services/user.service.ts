import type { User } from '@/models/user'

import api from '@/services/api'

export const userService = {
	findAll: async (): Promise<User[]> => {
		const { data } = await api.get('/users')

		return data
	},

	findById: async (id: string): Promise<User> => {
		const { data } = await api.get(`/users/${id}`)

		return data
	},

	create: async (user: Partial<User>): Promise<User> => {
		const { data } = await api.post('/users', user)

		return data
	},

	update: async (user: Partial<User>): Promise<User> => {
		const { data } = await api.put(`/users/${user.id}`, user)

		return data
	},

	remove: async (id: string): Promise<void> => {
		await api.delete(`/users/${id}`)
	},
}
