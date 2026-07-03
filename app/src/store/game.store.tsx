import { create } from 'zustand'

import { TYPES, type Type } from '@/models/game'
import type { Player } from '@/models/player'

interface State {
	status: boolean
	setStatus: (status: boolean) => void

	type: Type
	setType: (type: Type) => void

	players: Player[]
	setPlayers: (players: Player[]) => void
	addPlayer: (player: Player) => void
	removePlayer: (player: Player) => void
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
}))
