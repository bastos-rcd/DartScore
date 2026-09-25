import type { Message } from '@/models/message'

import { messageService } from '@/services/message.service'

let cache: Message[] = []
let loaded = false
let loadingPromise: Promise<void> | null = null

export function preloadMessages(): Promise<void> {
	if (loaded) return Promise.resolve()
	if (loadingPromise) return loadingPromise

	loadingPromise = messageService
		.findAll()
		.then((messages) => {
			cache = messages
			loaded = true
		})
		.finally(() => {
			loadingPromise = null
		})

	return loadingPromise
}

export function pickMessage(
	type: Message['type'],
	event: Message['event'],
): Message | null {
	const candidates = cache.filter((m) => m.type === type && m.event === event)
	if (candidates.length === 0) return null

	return candidates[Math.floor(Math.random() * candidates.length)]
}
