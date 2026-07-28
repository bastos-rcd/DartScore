export const TYPES = {
	X201: '201',
	X301: '301',
	X501: '501',
	KILLER: 'killer',
} as const

export type Type = (typeof TYPES)[keyof typeof TYPES]

export interface Game {
	id: string
	type: Type
	date: string
	rank: { player: string; score: number }[]
}
