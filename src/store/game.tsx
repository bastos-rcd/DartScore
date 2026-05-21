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

	players: [
		// {
		// 	id: '1',
		// 	name: 'Bastien',
		// },
		// {
		// 	id: '2',
		// 	name: 'Marie-Amélie',
		// },
	],
	setPlayers: (players: Player[]) => set({ players }),
	addPlayer: (players: Player[]) =>
		set((state) => ({ players: [...state.players, ...players] })),
	removePlayer: (players: Player[]) =>
		set((state) => ({
			players: state.players.filter((player) => !players.includes(player)),
		})),

	darts: [
		// {
		// 	id: '1',
		// 	label: 'D10',
		// 	score: 20,
		// 	playerId: '1',
		// },
		// {
		// 	id: '2',
		// 	label: '13',
		// 	score: 13,
		// 	playerId: '1',
		// },
		// {
		// 	id: '3',
		// 	label: '8',
		// 	score: 8,
		// 	playerId: '1',
		// },
		// {
		// 	id: '4',
		// 	label: '20',
		// 	score: 20,
		// 	playerId: '2',
		// },
		// {
		// 	id: '5',
		// 	label: '20',
		// 	score: 20,
		// 	playerId: '2',
		// },
		// {
		// 	id: '6',
		// 	label: '20',
		// 	score: 20,
		// 	playerId: '2',
		// },
		// {
		// 	id: '7',
		// 	label: '20',
		// 	score: 20,
		// 	playerId: '1',
		// },
		// {
		// 	id: '8',
		// 	label: '20',
		// 	score: 20,
		// 	playerId: '1',
		// },
	],
	addDart: (dart: Dart) => set((state) => ({ darts: [...state.darts, dart] })),
	removeDart: (dart: Dart) =>
		set((state) => ({ darts: state.darts.filter((d) => d !== dart) })),
}))
