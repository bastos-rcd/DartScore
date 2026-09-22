import type { Player } from '@/models/player'
import { TYPES, type Type } from '@/models/game'

type X01Event = 'low' | 'high' | 'turn' | 'bust' | 'finish'
type KillerEvent = 'hit' | 'attack' | 'die'

type Phrase = (player: Player, score?: number) => string

function pickRandom<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)]
}

const x01Messages: Record<X01Event, Phrase[]> = {
	low: [
		(player) => `${player.name}, t'es vraiment une chèvre.`,
		(player) => `${player.name}, quel clown !`,
		(player) => `${player.name}, tu lances comme un pingouin sous anesthésie.`,
		(player) => `${player.name}, on a retrouvé le dernier du classement.`,
		(player) => `${player.name}, retourne à l'entraînement, y a urgence.`,
	],
	high: [
		(player, score) => `${score} points ${player.name}, direction le sommet !`,
		(player, score) => `Incroyable ${player.name} avec ${score} points !`,
		(player, score) => `Respect ${player.name} avec ${score} points !`,
		(player, score) => `${player.name} montre les dents avec ${score} points !`,
		(player, score) =>
			`${player.name} augmente le rythme avec ${score} points !`,
	],
	turn: [
		(player, score) => `${player.name} marque ${score} points.`,
		(player, score) => `${player.name} empoche ${score} points.`,
		(player, score) => `${score} points pour ${player.name}.`,
		(player, score) => `${player.name} gratte ${score} points.`,
		(player, score) => `${player.name} ajoute ${score} points au compteur.`,
	],
	bust: [
		(player) => `Un peu nul ${player.name} !`,
		(player) => `Aïe, ${player.name} explose son compte !`,
		() => `Retour à la case départ, génie.`,
		(player) => `Les maths c'est compliqué pour toi ${player.name}.`,
		(player) => `Tu joues avec les pieds ou quoi, ${player.name} ?`,
	],
	finish: [
		(player) => `${player.name} gagne. Les autres peuvent rentrer chez eux.`,
		(player) => `${player.name} distribue des leçons gratuitement.`,
		(player) => `${player.name} envoie tout le monde réviser ses doubles.`,
		(player) => `${player.name} décroche la victoire avec style.`,
		(player) => `${player.name} vient d'humilier la concurrence.`,
	],
}

const killerMessages: Record<KillerEvent, Phrase[]> = {
	hit: [
		(player) => `${player.name} touche son numéro !`,
		(player) => `Bien joué ${player.name}, en plein dans le mille !`,
		(player) => `${player.name} touche sa cible comme un sniper.`,
		(player) => `${player.name} ne tremble pas.`,
		(player) => `Plein centre pour ${player.name} !`,
	],
	attack: [
		(player) => `${player.name} attaque un adversaire !`,
		(player) => `${player.name} fait perdre une vie !`,
		(player) => `${player.name} distribue les baffes !`,
		(player) => `${player.name} choisit la violence.`,
		(player) => `${player.name} attaque sans pitié.`,
	],
	die: [
		(player) => `${player.name} est éliminé !`,
		(player) => `${player.name} prend cher !`,
		(player) => `${player.name} voit rouge.`,
		(player) => `${player.name} est puni.`,
		(player) =>
			`${player.name} quitte la partie. Quelle tristesse. Enfin pas tant que ça.`,
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
