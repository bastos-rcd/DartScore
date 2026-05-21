import { create } from 'zustand'

import type { User } from '@/models/user'

interface State {
	status: boolean
	setStatus: (status: boolean) => void

	users: User[]
	setUsers: (users: User[]) => void
	addUser: (users: User[]) => void
	removeUser: (users: User[]) => void
}

export const gameStore = create<State>((set) => ({
	status: false,
	setStatus: (status: boolean) => set({ status }),

	users: [],
	setUsers: (users: User[]) => set({ users }),
	addUser: (users: User[]) =>
		set((state) => ({ users: [...state.users, ...users] })),
	removeUser: (users: User[]) =>
		set((state) => ({
			users: state.users.filter((user) => !users.includes(user)),
		})),
}))
