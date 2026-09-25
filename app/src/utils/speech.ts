import type { Player } from '@/models/player'
import { TYPES, type Type } from '@/models/game'
import type { Event, Message } from '@/models/message'

import { pickMessage } from '@/utils/message'

export async function speak(
	type: Type,
	event: Event,
	player: Player,
	score?: number,
): Promise<void> {
	if (!window.speechSynthesis) return

	let message: Message | null

	if (type === TYPES.X201 || type === TYPES.X301 || type === TYPES.X501) {
		message = pickMessage('X01', event)
	} else if (type === TYPES.KILLER) {
		message = pickMessage('KILLER', event)
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
