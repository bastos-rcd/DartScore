import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Role, User } from '@/models/user'
import { authService } from '@/services/auth.service'

export const ROLES = {
	USER: 'USER',
	ADMIN: 'ADMIN',
}

interface State {
	token: string | null
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean

	login: (credentials: { email: string; password: string }) => Promise<User>
	me: () => Promise<User | null>
	logout: () => void
	hasRole: (role: Role) => boolean
}

export const authStore = create<State>()(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			isLoading: false,

			login: async (creadential: { email: string; password: string }) => {
				set({ isLoading: true })

				try {
					const { token } = await authService.login(creadential)
					set({ token })

					const user = await authService.me()
					set({ user, isAuthenticated: true, isLoading: false })

					return user
				} catch (error) {
					set({
						isLoading: false,
						token: null,
						user: null,
						isAuthenticated: false,
					})
					console.log(error)

					throw Error()
				}
			},

			me: async () => {
				if (!get().token) {
					set({ isAuthenticated: false })
					return null
				}
				set({ isLoading: true })

				try {
					const user = await authService.me()
					set({ user, isAuthenticated: true, isLoading: false })

					return user
				} catch (error) {
					set({
						isLoading: false,
						token: null,
						user: null,
						isAuthenticated: false,
					})
					console.log(error)
					return null
				}
			},

			logout: () => {
				set({
					token: null,
					user: null,
					isAuthenticated: false,
				})
			},

			hasRole: (role: Role) => {
				const user = get().user
				return !!user && user.role === role
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({ token: state.token }),
		},
	),
)
