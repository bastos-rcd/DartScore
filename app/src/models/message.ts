export const TYPES = {
	X01: 'X01',

	KILLER: 'KILLER',
} as const

export type Type = (typeof TYPES)[keyof typeof TYPES]

export const EVENTS = {
	LOW: 'low',
	HIGH: 'high',
	TURN: 'turn',
	BUST: 'bust',
	FINISH: 'finish',
	HIT: 'hit',
	ATTACK: 'attack',
	DIE: 'die',
} as const

export type Event = (typeof EVENTS)[keyof typeof EVENTS]

export interface Message {
	id: string
	type: Type
	event: Event
	text: string
}
