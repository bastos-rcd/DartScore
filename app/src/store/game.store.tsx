import { create } from 'zustand'

import { TYPES, type Game, type Type } from '@/models/game'
import type { Player } from '@/models/player'
import type { Dart } from '@/models/dart'
import type { Killer } from '@/models/killer'

import { gameService } from '@/services/game.service'

import { speak } from '@/utils/speech'

interface State {
	status: boolean
	setStatus: (status: boolean) => void

	type: Type
	setType: (type: Type) => void

	// --- X01 ---
	players: Player[]
	setPlayers: (players: Player[]) => void

	classment: Player[]
	addClassment: (player: Player) => void
	removeClassment: (player: Player) => void

	darts: Dart[]
	addDart: (dart: Dart) => void
	removeDart: (dart: Dart) => void

	// --- KILLER ---
	killers: Killer[]
	setKillers: (players: Player[]) => void
	setNumber: (playerId: string, number: number) => void

	currentKiller: number
	currentkillerDarts: number
	registerHit: (number: number, multiplier: number) => void

	saving: boolean
	saveGame: () => Promise<void>
}

export const gameStore = create<State>((set, get) => ({
	status: false,
	setStatus: (status: boolean) => set({ status }),

	type: TYPES.X301,
	setType: (type: Type) => set({ type }),

	// --- X01 ---
	players: [],
	setPlayers: (players: Player[]) => set({ players }),

	classment: [],
	addClassment: (player: Player) =>
		set((state) => ({
			classment: [...state.classment, player],
		})),
	removeClassment: (player: Player) =>
		set((state) => ({
			classment: state.classment.filter((p) => p.id !== player.id),
		})),

	darts: [],
	addDart: (dart: Dart) => set((state) => ({ darts: [...state.darts, dart] })),
	removeDart: (dart: Dart) =>
		set((state) => ({ darts: state.darts.filter((d) => d.id !== dart.id) })),

	// --- KILLER ---
	killers: [],
	setKillers: (players: Player[]) =>
		set(() => ({
			killers: players.map((player) => ({
				player,
				number: null,
				hits: 0,
				lives: 3,
			})),
		})),
	setNumber: (playerId, number) =>
		set((state) => ({
			killers: state.killers.map((k) =>
				k.player.id === playerId ? { ...k, number } : k,
			),
		})),

	currentKiller: 0,
	currentkillerDarts: 0,
	registerHit: (number, multiplier) => {
		const { killers, currentKiller, currentkillerDarts } = get()

		const active = killers.filter((k) => k.lives > 0)
		const thrower = active[currentKiller % active.length]
		if (!thrower) return

		const updated = killers.map((k) => ({ ...k }))

		if (number === thrower.number) {
			const throwerState = updated.find(
				(p) => p.player.id === thrower.player.id,
			)!
			if (throwerState.hits < 3) {
				const newHits = Math.min(3, throwerState.hits + multiplier)
				throwerState.hits = newHits
				speak(TYPES.KILLER, 'hit', thrower.player)
			}
		} else if (thrower.hits === 3) {
			const target = updated.find(
				(p) =>
					p.number === number &&
					p.lives > 0 &&
					p.player.id !== thrower.player.id,
			)
			if (target) {
				target.lives = Math.max(0, target.lives - multiplier)
				speak(
					TYPES.KILLER,
					target.lives === 0 ? 'die' : 'attack',
					target.lives === 0 ? target.player : thrower.player,
				)
			}
		}

		const stillActive = updated.filter((k) => k.lives > 0)

		set({
			killers: updated,
		})

		if (stillActive.length <= 1) {
			get().saveGame()
			return
		}

		const dartsThisTurn = currentkillerDarts + 1
		if (dartsThisTurn >= 3) {
			set({
				currentkillerDarts: 0,
				currentKiller: (currentKiller + 1) % stillActive.length,
			})
		} else {
			set({ currentkillerDarts: dartsThisTurn })
		}
	},

	saving: false,
	saveGame: async () => {
		const { type, players, classment, darts, killers, saving } = get()

		if (saving) return

		set({ saving: true })

		try {
			const POINTS = [5, 3, 1]

			const result: { player: string; score: number }[] = []

			if (type === TYPES.X201 || type === TYPES.X301 || type === TYPES.X501) {
				const counts = classment.map((player) => ({
					player,
					dartCount: darts.filter((d) => d.playerId === player.id).length,
				}))

				const sorted = [...counts].sort((a, b) => {
					if (a.dartCount !== b.dartCount) return a.dartCount - b.dartCount
					return (
						classment.findIndex((p) => p.id === a.player.id) -
						classment.findIndex((p) => p.id === b.player.id)
					)
				})

				players.forEach((player) => {
					const index = sorted.findIndex((c) => c.player.id === player.id)

					if (index === -1) {
						result.push({ player: player.id, score: 0 })
						return
					}

					const sameCount = sorted[index].dartCount
					const firstSameCount = sorted.findIndex(
						(c) => c.dartCount === sameCount,
					)

					result.push({
						player: player.id,
						score: POINTS[firstSameCount] ?? 0,
					})
				})
			}

			if (type === TYPES.KILLER) {
				const stillActive = killers.filter((k) => k.lives > 0)

				let winner: Player | null = null

				if (stillActive.length === 1) {
					winner = stillActive[0].player
				} else if (stillActive.length > 1) {
					const eligible = stillActive.filter((k) => k.hits === 3)

					if (eligible.length > 0) {
						const maxLives = Math.max(...eligible.map((k) => k.lives))
						const topPlayers = eligible.filter((k) => k.lives === maxLives)

						if (topPlayers.length === 1) {
							winner = topPlayers[0].player
						}
					}
				}

				if (winner) {
					result.push({ player: winner.id, score: POINTS[1] })
				}

				killers.forEach((k) => {
					if (!result.find((r) => r.player === k.player.id)) {
						result.push({ player: k.player.id, score: 0 })
					}
				})
			}

			const game: Partial<Game> = {
				type: type,
				rank: result,
			}

			await gameService.create(game)

			set({
				status: false,
				players: [],
				darts: [],
				classment: [],
				killers: [],
				currentKiller: 0,
				currentkillerDarts: 0,
			})
		} catch (error) {
			alert('Impossible de sauvegarder la partie.')
		} finally {
			set({ saving: false })
		}
	},
}))
