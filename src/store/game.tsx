import { create } from 'zustand'

import type { Player } from '@/models/player'
import type { Dart } from '@/models/dart'

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
	setClassment: (player: Player) => void

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
	setClassment: (player: Player) =>
		set((state) => ({
			classment: [...state.classment, player],
		})),

	isSaving: true,
	saveGame: async () => {
		const { darts, players, classment, isSaving } = get()

		if (isSaving) return

		set({ isSaving: true })

		try {
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
