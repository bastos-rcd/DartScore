import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { TYPES } from '@/models/game'

import { gameStore } from '@/store/game.store'

import Divider from '@/components/divider'
import Title from '@/components/title'

import KillerSetup from '@/components/killer/killer-setup'
import KillerScore from '@/components/killer/killer-score'
import KillerTarget from '@/components/killer/killer-target'

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
			<Title title={`Partie de KILLER`} />

			<Divider />

			<KillerScore />

			<Divider />

			<KillerTarget />
		</>
	)
}
