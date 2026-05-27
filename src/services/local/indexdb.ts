import Dexie, { type Table } from 'dexie'

import type { Player } from '@/models/player'
import type { Game } from '@/models/game'

export class DartScoreDB extends Dexie {
	players!: Table<Player, string>
	games!: Table<Game, string>

	constructor() {
		super('dartscoredb')

		this.version(1).stores({
			players: '++id',
			games: '++id',
		})
	}
}

export const db = new DartScoreDB()
