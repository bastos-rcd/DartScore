import type { IGameService } from '@/services/interface'

import { gameLocalService } from '@/services/local/game.local'
import { gameRemoteService } from '@/services/remote/game.remote'

const isPocketbase = import.meta.env.VITE_DB === 'pocketbase'
export const gameService: IGameService = isPocketbase
	? gameRemoteService
	: gameLocalService
