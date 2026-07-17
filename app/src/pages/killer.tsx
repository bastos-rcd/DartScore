import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { TYPES } from '@/models/game'

import { gameStore } from '@/store/game.store'

import Card from '@/components/card'

export default function Killer() {
	const navigate = useNavigate()

	const { status, setStatus, type, setPlayers } = gameStore()

	useEffect(() => {
		if (!status || type != TYPES.KILLER) {
			navigate('/')
			return
		}

		setTimeout(() => {
			setStatus(false)
			setPlayers([])
		}, 1500)
	}, [status, type, navigate])

	if (!status) return null

	return (
		<>
			<Card
				title="Indisponible"
				content="Cette fonctionnalité est en cours de développement !"
			/>
		</>
	)
}
