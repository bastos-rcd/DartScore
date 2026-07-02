import type { User } from '@/models/user'

import api from '@/services/api'

export const authService = {
	login: async (credentials: {
		email: string
		password: string
	}): Promise<{ token: string }> => {
		const { data } = await api.post('/auth/login', credentials)

		return data
	},

	me: async (): Promise<User> => {
		const { data } = await api.get('/auth/me')

		return data
	},
}
