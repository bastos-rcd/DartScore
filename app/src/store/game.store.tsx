import { create } from 'zustand'

import { TYPES, type Game, type Type } from '@/models/game'
import type { Player } from '@/models/player'
import type { Dart } from '@/models/dart'
import { gameService } from '@/services/game.service'

interface State {
	status: boolean
	setStatus: (status: boolean) => void

	type: Type
	setType: (type: Type) => void

	players: Player[]
	setPlayers: (players: Player[]) => void
	addPlayer: (player: Player) => void
	removePlayer: (player: Player) => void

	classment: Player[]
	addClassment: (player: Player) => void
	removeClassment: (player: Player) => void

	darts: Dart[]
	addDart: (dart: Dart) => void
	removeDart: (dart: Dart) => void

	saving: boolean
	saveGame: () => Promise<void>
}

export const gameStore = create<State>((set, get) => ({
	status: false,
	setStatus: (status: boolean) => set({ status }),

	type: TYPES.X301,
	setType: (type: Type) => set({ type }),

	players: [],
	setPlayers: (players: Player[]) => set({ players }),
	addPlayer: (player: Player) =>
		set((state) => ({ players: [...state.players, player] })),
	removePlayer: (player: Player) =>
		set((state) => ({
			players: state.players.filter((p) => p.id !== player.id),
		})),

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

	saving: false,
	saveGame: async () => {
		const { type, players, classment, darts, saving } = get()

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
			})
		} catch (error) {
			alert('Impossible de sauvegarder la partie.')
		} finally {
			set({ saving: false })
		}
	},
}))
