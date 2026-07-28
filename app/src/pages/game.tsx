import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TYPES } from '@/models/game'
import type { Player } from '@/models/player'

import { gameStore } from '@/store/game.store'

import Divider from '@/components/divider'
import Title from '@/components/title'

import GameScore from '@/components/game/game-score'
import GameTarget from '@/components/game/game-target'

export default function Game() {
	const navigate = useNavigate()

	const { status, type, players, classment, darts, saving, saveGame } =
		gameStore()

	const [current, setCurrent] = useState<Player>()

	useEffect(() => {
		if (
			!status ||
			(type != TYPES.X201 && type != TYPES.X301 && type != TYPES.X501)
		) {
			navigate('/')
			return
		}

		if (darts.length === 0) {
			setCurrent(players[0])
			return
		}

		const last = darts[darts.length - 1]
		const thrown = darts.filter((d) => d.playerId === last.playerId)

		let next: Player | undefined

		const lastPlayerHasFinished = classment.some((p) => p.id === last.playerId)

		if (thrown.length % 3 === 0 || lastPlayerHasFinished) {
			const lastIndex = players.findIndex((p) => p.id === last.playerId)

			let checkIndex = (lastIndex + 1) % players.length

			for (let count = 0; count < players.length; count++) {
				const playerToCheck = players[checkIndex]

				if (!classment.some((p) => p.id === playerToCheck.id)) {
					next = playerToCheck
					break
				}
				checkIndex = (checkIndex + 1) % players.length
			}
		} else {
			next = players.find((p) => p.id === last.playerId)
		}

		if (!next) {
			if (!saving) saveGame()
			return
		}

		setCurrent(next)
	}, [status, darts, classment, saving])

	if (!status) return null

	return (
		<>
			<Title title={`Partie en ${type} points`} />

			<Divider />

			<GameScore current={current ?? players[0]} />

			<Divider />

			<GameTarget player={current ?? players[0]} />
		</>
	)
}
