import { create } from 'zustand'

import type { Player } from '@/models/player'
import type { Dart } from '@/models/dart'
import type { Game } from '@/models/game'
import { gameService } from '@/services/game.service'

interface State {
	status: boolean
	setStatus: (status: boolean) => void

	players: Player[]
	setPlayers: (players: Player[]) => void
	addPlayer: (players: Player[]) => void
	removePlayer: (players: Player[]) => void

	darts: Dart[]
	addDart: (dart: Dart) => void
	removeDart: (dart: Dart) => void

	classment: Player[]
	addClassment: (player: Player) => void
	removeClassment: (player: Player) => void

	isSaving: boolean
	saveGame: () => Promise<void>
}

export const gameStore = create<State>((set, get) => ({
	status: false,
	setStatus: (status: boolean) => set({ status }),

	players: [],
	setPlayers: (players: Player[]) => set({ players }),
	addPlayer: (players: Player[]) =>
		set((state) => ({ players: [...state.players, ...players] })),
	removePlayer: (players: Player[]) =>
		set((state) => ({
			players: state.players.filter((player) => !players.includes(player)),
		})),

	darts: [],
	addDart: (dart: Dart) => set((state) => ({ darts: [...state.darts, dart] })),
	removeDart: (dart: Dart) =>
		set((state) => ({ darts: state.darts.filter((d) => d !== dart) })),

	classment: [],
	addClassment: (player: Player) =>
		set((state) => ({
			classment: [...state.classment, player],
		})),
	removeClassment: (player: Player) =>
		set((state) => ({
			classment: state.classment.filter((p) => p.id !== player.id),
		})),

	isSaving: false,
	saveGame: async () => {
		const { players, classment, isSaving } = get()

		if (isSaving) return

		set({ isSaving: true })

		try {
			const result: { player: Player; score: number }[] = []

			players.forEach((player) => {
				const index = classment.findIndex((c) => c.id === player.id)

				result.push({
					player: player,
					score: index > -1 ? players.length - index : 0,
				})
			})

			const game: Game = {
				id: crypto.randomUUID(),
				classment: result,
				date: new Date().toLocaleDateString('fr-FR'),
			}

			await gameService.addGame(game)

			set({
				status: false,
				players: [],
				darts: [],
				classment: [],
			})
		} catch (error) {
			alert('Impossible de sauvegarder la partie.')
		} finally {
			set({ isSaving: false })
		}
	},
}))
