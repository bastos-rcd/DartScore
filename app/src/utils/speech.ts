import type { Player } from '@/models/player'
import { TYPES, type Type } from '@/models/game'
import type { Event, Message } from '@/models/message'

import { messageService } from '@/services/message.service'

export function speak(
	type: Type,
	event: Event,
	player: Player,
	score?: number,
): void
export function speak(
	type: typeof TYPES.KILLER,
	event: Event,
	player: Player,
	score?: number,
): void
export async function speak(
	type: Type,
	event: Event,
	player: Player,
	score?: number,
): Promise<void> {
	if (!window.speechSynthesis) return

	let message: Message | null

	if (type === TYPES.X201 || type === TYPES.X301 || type === TYPES.X501) {
		message = await messageService.random('X01', event)
	} else if (type === TYPES.KILLER) {
		message = await messageService.random('KILLER', event)
	} else {
		return
	}

	if (!message) return

	let text: string = message.text.replaceAll('{player}', player.name)
	if (score) text = text.replaceAll('{score}', score.toString())

	window.speechSynthesis.cancel()
	const utterance = new SpeechSynthesisUtterance(text)
	utterance.lang = 'fr-FR'
	utterance.rate = 1
	utterance.pitch = 1
	window.speechSynthesis.speak(utterance)
}
