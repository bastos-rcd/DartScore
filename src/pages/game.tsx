import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Player } from '@/models/player'
import { gameStore } from '@/store/game'

import GameTarget from '@/components/game/game-target'
import GameCurrent from '@/components/game/game-current'
import Divider from '@/components/ui/divider'
import GameScore from '@/components/game/game-score'

export default function Game() {
	const navigate = useNavigate()

	const { status, players, darts, classment, isSaving, saveGame } = gameStore()

	const [current, setCurrent] = useState<Player>()

	useEffect(() => {
		if (!status) {
			navigate('/rank')
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
			if (!isSaving) saveGame()
			return
		}

		setCurrent(next)
	}, [status, darts])

	if (!status) return <></>

	if (isSaving) {
		return (
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 backdrop-blur">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-(--border) border-t-(--black)"></div>
				<p className="font-bold tracking-wider uppercase">
					Sauvegarde en cours...
				</p>
			</div>
		)
	}

	return (
		<>
			<GameTarget player={current ?? players[0]} />

			<GameCurrent player={current ?? players[0]} />

			<Divider />

			<GameScore />
		</>
	)
}
