import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Player } from '@/models/player'
import { gameStore } from '@/store/game'

import GameTarget from '@/components/game/game-target'
import GameCurrent from '@/components/game/game-current'

export default function Game() {
	const navigate = useNavigate()

	const { status, players, darts } = gameStore()

	const [current, setCurrent] = useState<Player>()

	useEffect(() => {
		if (!status) {
			navigate('/')
			return
		}

		const last = darts[darts.length - 1]

		if (!last) {
			setCurrent(players[0])
			return
		}

		const thrown = darts.filter((d) => d.playerId === last.playerId).length
		if (thrown % 3 === 0) {
			const currentIndex = players.findIndex((p) => p.id === last.playerId)

			if (currentIndex === players.length - 1) {
				setCurrent(players[0])
				return
			}

			setCurrent(players[currentIndex + 1])
			return
		}
		setCurrent(players.find((p) => p.id === last.playerId))
	}, [status, darts])

	return (
		<>
			<GameTarget player={current ?? players[0]} />

			<GameCurrent player={current ?? players[0]} />
		</>
	)
}
