import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { gameStore } from '@/store/game'

import GameTarget from '@/components/game/game-target'

export default function Game() {
	const navigate = useNavigate()

	const { status } = gameStore()

	useEffect(() => {
		if (!status) {
			navigate('/')
			return
		}
	}, [status])

	return (
		<>
			<GameTarget playerId="" />
		</>
	)
}
