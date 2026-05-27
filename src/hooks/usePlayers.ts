import { useEffect, useState } from 'react'

import { playerService } from '@/services/player.service'

import type { Player } from '@/models/player'

export function usePlayers() {
	const [players, setPlayers] = useState<Player[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = playerService.getLivePlayers((data) => {
			setPlayers(data)
			setLoading(false)
		})
		return () => unsubscribe()
	}, [])

	return { players, loading }
}
