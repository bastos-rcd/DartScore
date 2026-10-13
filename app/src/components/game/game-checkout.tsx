import { useMemo } from 'react'

import type { Player } from '@/models/player'

import { gameStore } from '@/store/game.store'

import { suggestDarts } from '@/utils/checkout'

export default function GameCheckout(props: { player: Player }) {
	const { type, darts } = gameStore()

	const routes = useMemo(() => {
		const thrown = darts.filter((d) => d.playerId === props.player.id)
		const remaining = Number(type) - thrown.reduce((a, b) => a + b.score, 0)
		const dartsLeft = 3 - (thrown.length % 3)

		return suggestDarts(remaining, dartsLeft)
	}, [type, darts, props.player])

	if (routes.length === 0) return null

	return (
		<div className="flex flex-row flex-wrap justify-center gap-2">
			{routes.map((route) => (
				<div
					key={route.map((dart) => dart.label).join('-')}
					className="flex flex-row gap-1 rounded-xl border border-(--border) p-1"
				>
					{route.map((dart, index) => (
						<span
							key={index}
							className="flex min-w-9 items-center justify-center rounded-lg bg-(--border)/50 px-1.5 py-1 font-bold"
						>
							{dart.label}
						</span>
					))}
				</div>
			))}
		</div>
	)
}
