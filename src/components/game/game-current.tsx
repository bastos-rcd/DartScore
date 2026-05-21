import { useEffect, useState } from 'react'

import type { Player } from '@/models/player'
import type { Dart } from '@/models/dart'
import { gameStore } from '@/store/game'

export default function GameCurrent(props: { player: Player }) {
	const { darts, removeDart } = gameStore()

	const [last, setLast] = useState<Dart[]>()

	useEffect(() => {
		console.log(props.player)

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

	return (
		<>
			<div className="flex flex-row items-center">
				<h1 className="flex-1">Au tour de : {props.player.name}</h1>

				<button
					onClick={handleCancel}
					className="rounded-xl bg-(--red) px-2 py-1.5"
				>
					<i className="fa-solid fa-arrow-rotate-left fa-sm"></i>
				</button>
			</div>

			<div className="flex flex-row justify-center gap-4">
				{last?.map((dart) => (
					<span
						key={dart.id}
						className="rounded-xl bg-(--border) px-3 py-2 font-bold"
					>
						{dart.label}
					</span>
				))}
			</div>
		</>
	)
}
