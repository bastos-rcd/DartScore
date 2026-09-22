import type { Message } from '@/models/message'

import api from '@/services/api'

export const messageService = {
	findAll: async (): Promise<Message[]> => {
		const { data } = await api.get('/messages')

		return data
	},

	findById: async (id: string): Promise<Message> => {
		const { data } = await api.get(`/messages/${id}`)

		return data
	},

	create: async (message: Partial<Message>): Promise<Message> => {
		const { data } = await api.post('/messages', message)

		return data
	},

	update: async (message: Partial<Message>): Promise<Message> => {
		const { data } = await api.put(`/messages/${message.id}`, message)

		return data
	},

	remove: async (id: string): Promise<void> => {
		await api.delete(`/messages/${id}`)
	},

	random: async (type: string, event: string): Promise<Message | null> => {
		const { data } = await api.post('/messages/random', {
			type,
			event,
		})

		return data
	},
}
