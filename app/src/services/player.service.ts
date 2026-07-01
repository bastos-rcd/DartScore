import type { IPlayerService } from '@/services/interface'

import { playerLocalService } from '@/services/local/player.local'
import { playerRemoteService } from '@/services/remote/player.remote'

const isPocketbase = import.meta.env.VITE_DB === 'pocketbase'
export const playerService: IPlayerService = isPocketbase
	? playerRemoteService
	: playerLocalService
