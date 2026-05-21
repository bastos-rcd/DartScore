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
}

export const gameStore = create<State>((set) => ({
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
}))
