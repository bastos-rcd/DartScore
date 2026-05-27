import type { Player } from '@/models/player'

type Event = 'bust' | 'finish' | 'turn'

const message: Record<Event, (player: Player, score?: number) => string> = {
	bust: (player) => `Raté ${player.name} !`,
	finish: (player) => `${player.name} a terminé la partie, bien joué !`,
	turn: (player, score) => `${score} points pour ${player.name}.`,
}

export function speak(event: Event, player: Player, score?: number): void {
	if (!window.speechSynthesis) return

	window.speechSynthesis.cancel()
	const utterance = new SpeechSynthesisUtterance(message[event](player, score))
	utterance.lang = 'fr-FR'
	utterance.rate = 1
	utterance.pitch = 1
	window.speechSynthesis.speak(utterance)
}
