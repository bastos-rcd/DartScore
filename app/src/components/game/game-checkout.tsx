import { useMemo } from 'react'

import type { Player } from '@/models/player'

import { gameStore } from '@/store/game.store'

import { suggestDarts } from '@/utils/checkout'

export default function GameCheckout(props: { player: Player }) {
	const { type, darts } = gameStore()

	const suggestions = useMemo(() => {
		const thrown = darts.filter((d) => d.playerId === props.player.id)
		const remaining = Number(type) - thrown.reduce((a, b) => a + b.score, 0)
		const dartsLeft = 3 - (thrown.length % 3)

		return suggestDarts(remaining, dartsLeft)
	}, [type, darts, props.player])

	return (
		<div className="flex flex-row justify-center gap-4">
			{suggestions.map((suggestion) => (
				<span
					key={suggestion.label}
					className="flex aspect-square items-center justify-center rounded-xl border border-(--border) bg-(--border)/50 p-2 font-bold"
				>
					{suggestion.label}
				</span>
			))}
		</div>
	)
}
