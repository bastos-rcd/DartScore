import { create } from 'zustand'

import { TYPES, type Type } from '@/models/game'
import type { Player } from '@/models/player'
import type { Dart } from '@/models/dart'

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

	saveGame: async () => {},
}))
