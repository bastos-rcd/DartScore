import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Player } from '@/models/player'
import type { Dart } from '@/models/dart'
import { gameStore } from '@/store/game'

import GameItem from '@/components/game/game-item'

export default function GameCurrent(props: { player: Player }) {
	const navigate = useNavigate()

	const { darts, removeDart, saveGame } = gameStore()

	const [last, setLast] = useState<Dart[]>([])

	useEffect(() => {
		const thrown = darts.filter((d) => d.playerId === props.player.id)

		if (thrown.length % 3 == 1) {
			setLast([thrown[thrown.length - 1]])
			return
		}

		if (thrown.length % 3 == 2) {
			setLast([thrown[thrown.length - 1], thrown[thrown.length - 2]])
			return
		}

		setLast([])
	}, [props.player, darts])

	const handleCancel = () => {
		if (darts.length === 0) return

		removeDart(darts[darts.length - 1])
	}

	const handleSave = () => {
		if (confirm('Voulez-vous arrêter et sauvegarder cette partie ?')) {
			saveGame().then(() => {
				navigate('/history')
			})
		}
	}

	return (
		<>
			<div className="flex flex-row items-center gap-2">
				<h1 className="flex-1">Au tour de : {props.player.name}</h1>

				<button
					onClick={handleCancel}
					className="rounded-xl bg-(--red) px-2 py-1.5"
				>
					<i className="fa-solid fa-arrow-rotate-left fa-sm"></i>
				</button>

				<button
					onClick={handleSave}
					className="rounded-xl bg-(--green) px-2 py-1.5"
				>
					<i className="fa-solid fa-floppy-disk"></i>
				</button>
			</div>

			<div className="flex flex-row justify-center gap-4">
				{last.length > 0 ? <GameItem label={last[0].label} /> : <GameItem />}

				{last.length > 1 ? <GameItem label={last[1].label} /> : <GameItem />}

				{last.length > 2 ? <GameItem label={last[2].label} /> : <GameItem />}
			</div>
		</>
	)
}
