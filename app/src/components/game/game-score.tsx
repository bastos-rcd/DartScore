import { useEffect, useRef, useState } from 'react'

import type { Dart } from '@/models/dart'
import type { Player } from '@/models/player'

import { gameStore } from '@/store/game.store'

import GameItem from '@/components/game/game-item'

interface Score {
	player: Player
	score: number
	darts: Dart[]
}

export default function GameScore(props: { current?: Player }) {
	const { type, players, darts } = gameStore()

	const [scores, setScores] = useState<Score[]>()

	const containerRef = useRef<HTMLDivElement>(null)
	const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

	useEffect(() => {
		const scores: Score[] = []

		players.forEach((player) => {
			const thrown = darts.filter((d) => d.playerId === player.id)
			let last: Dart[] = []

			if (thrown.length % 3 == 1) {
				last = [thrown[thrown.length - 1]]
			} else if (thrown.length % 3 == 2) {
				last = [thrown[thrown.length - 1], thrown[thrown.length - 2]]
			} else if (thrown.length % 3 == 0 && thrown.length > 0) {
				last = [
					thrown[thrown.length - 1],
					thrown[thrown.length - 2],
					thrown[thrown.length - 3],
				]
			} else {
				last = []
			}

			const value =
				Number(type) -
				thrown.reduce((a, b) => {
					return a + b.score
				}, 0)

			scores.push({ player, score: value, darts: last })
		})

		setScores(scores)
	}, [darts])

	useEffect(() => {
		if (!props.current) return

		const node = itemRefs.current[props.current.id]
		if (!node) return

		node.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
	}, [props.current])

	return (
		<div
			ref={containerRef}
			className="flex flex-1 flex-col gap-2 overflow-y-auto"
		>
			{scores?.map((score) => {
				const isCurrent = score.player.id === props.current?.id

				return (
					<div
						key={score.player.id}
						ref={(node) => {
							itemRefs.current[score.player.id] = node
						}}
						className={`flex flex-row items-center justify-between gap-2 rounded-xl border border-(--border) p-2 transition-colors ${
							isCurrent && 'bg-(--yellow)/50'
						}`}
					>
						<span className="font-bold">
							{score.player.name} : {score.score}
						</span>

						<div className="flex flex-row justify-center gap-4">
							{score.darts.length > 2 ? (
								<GameItem label={score.darts[2].label} />
							) : (
								<GameItem />
							)}
							{score.darts.length > 1 ? (
								<GameItem label={score.darts[1].label} />
							) : (
								<GameItem />
							)}
							{score.darts.length > 0 ? (
								<GameItem label={score.darts[0].label} />
							) : (
								<GameItem />
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}
