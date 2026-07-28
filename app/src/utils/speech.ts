import type { Player } from '@/models/player'
import { TYPES, type Type } from '@/models/game'

type X01Event = 'bust' | 'finish' | 'turn'
type KillerEvent = 'hit' | 'attack' | 'die'

type Phrase = (player: Player, score?: number) => string

function pickRandom<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)]
}

const x01Messages: Record<X01Event, Phrase[]> = {
	bust: [
		(player) => `Raté ${player.name} !`,
		(player) => `Aïe, ${player.name} explose son compte !`,
		(player) => `${player.name}, c'est loupé !`,
		(player) => `Un peu nul ${player.name} !`,
	],
	finish: [
		(player) => `${player.name} a terminé la partie, bien joué !`,
		(player) => `Victoire pour ${player.name} !`,
		(player) => `Quelle finition, ${player.name} !`,
		(player) => `${player.name} remporte la partie !`,
	],
	turn: [
		(player, score) => `${score} points pour ${player.name}.`,
		(player, score) => `${player.name} marque ${score} points.`,
	],
}

const killerMessages: Record<KillerEvent, Phrase[]> = {
	hit: [
		(player) => `${player.name} touche son numéro !`,
		(player) => `Bien joué ${player.name}, en plein dans le mille !`,
	],
	attack: [
		(player) => `${player.name} attaque un adversaire !`,
		(player) => `${player.name} fait perdre une vie !`,
	],
	die: [
		(player) => `${player.name} perd une vie !`,
		(player) => `${player.name} est éliminé !`,
	],
}

export function speak(
	type: Type,
	event: X01Event,
	player: Player,
	score?: number,
): void
export function speak(
	type: typeof TYPES.KILLER,
	event: KillerEvent,
	player: Player,
	score?: number,
): void
export function speak(
	type: Type,
	event: X01Event | KillerEvent,
	player: Player,
	score?: number,
): void {
	if (!window.speechSynthesis) return

	const messages = type === TYPES.KILLER ? killerMessages : x01Messages
	const variants = (messages as Record<string, Phrase[]>)[event]
	if (!variants) return

	const text = pickRandom(variants)(player, score)

	window.speechSynthesis.cancel()
	const utterance = new SpeechSynthesisUtterance(text)
	utterance.lang = 'fr-FR'
	utterance.rate = 1
	utterance.pitch = 1
	window.speechSynthesis.speak(utterance)
}
