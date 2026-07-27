import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { TYPES } from '@/models/game'

import { gameStore } from '@/store/game.store'

import Card from '@/components/card'
import KillerSetup from '@/components/killer/killer-setup'

export default function Killer() {
	const navigate = useNavigate()

	const { status, type, killers } = gameStore()

	useEffect(() => {
		if (!status || type != TYPES.KILLER) {
			navigate('/')
			return
		}
	}, [status, type, navigate])

	if (!status) return null

	const setupDone =
		killers.length > 0 && killers.every((k) => k.number !== null)

	if (!setupDone) {
		return (
			<>
				<KillerSetup />
			</>
		)
	}

	return (
		<>
			<Card
				title="Indisponible"
				content="Cette fonctionnalité est en cours de développement !"
			/>
		</>
	)
}
