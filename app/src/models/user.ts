export const ROLES = {
	USER: 'USER',
	ADMIN: 'ADMIN',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export interface User {
	id: string
	username: string
	password?: string
	role: Role
	active: boolean
}
