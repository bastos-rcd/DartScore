import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Player } from '@/models/player'
import { gameStore } from '@/store/game'

const NUMBERS = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 0,
]

export default function GameTarget(props: { player: Player }) {
	const navigate = useNavigate()

	const {
		players,
		darts,
		addDart,
		removeDart,
		classment,
		addClassment,
		removeClassment,
		saveGame,
	} = gameStore()

	const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1)

	const handleClick = (value: number, multiplier: number) => {
		let totalScore = value * multiplier
		let label =
			multiplier === 2
				? `D${value}`
				: multiplier === 3
					? `T${value}`
					: `${totalScore}`

		const allPlayerDarts = darts.filter((d) => d.playerId === props.player.id)

		const currentTurnCount = allPlayerDarts.length % 3

		const previousTurnsDarts = allPlayerDarts.slice(
			0,
			allPlayerDarts.length - currentTurnCount,
		)

		const currentTurnDarts = allPlayerDarts.slice(
			allPlayerDarts.length - currentTurnCount,
		)

		const scoreAtStartOfTurn = previousTurnsDarts.reduce(
			(a, b) => a + b.score,
			0,
		)
		const scoreScoredThisTurn = currentTurnDarts.reduce(
			(a, b) => a + b.score,
			0,
		)

		if (301 - (scoreAtStartOfTurn + scoreScoredThisTurn + totalScore) < 0) {
			const dartsToAddCount = 3 - currentTurnCount
			const compensationScore = -scoreScoredThisTurn

			for (let i = 0; i < dartsToAddCount; i++) {
				addDart({
					id: crypto.randomUUID(),
					label: i === 0 ? 'BUST' : '0',
					score: i === 0 ? compensationScore : 0,
					playerId: props.player.id,
				})
			}
			return
		}

		if (301 - (scoreAtStartOfTurn + scoreScoredThisTurn + totalScore) === 0) {
			if (!classment.includes(props.player)) {
				addClassment(props.player)
			}
		}

		addDart({
			id: crypto.randomUUID(),
			label,
			score: totalScore,
			playerId: props.player.id,
		})
	}

	const handleCancel = () => {
		if (darts.length === 0) return

		removeDart(darts[darts.length - 1])

		const lastDart = darts[darts.length - 1]

		const playerDarts = darts.filter((d) => d.playerId === lastDart.playerId)
		const scoreAfterRemoval = playerDarts
			.slice(0, playerDarts.length - 1)
			.reduce((acc, d) => acc + d.score, 0)

		if (
			classment.some((p) => p.id === lastDart.playerId) &&
			scoreAfterRemoval < 301
		) {
			removeClassment(players.find((p) => p.id === lastDart.playerId)!)
		}

		removeDart(lastDart)
	}

	const handleSave = () => {
		if (confirm('Voulez-vous arrêter et sauvegarder cette partie ?')) {
			saveGame().then(() => {
				navigate('/rank')
			})
		}
	}

	return (
		<div className="grid grid-cols-7 gap-1">
			{NUMBERS.map((num) => (
				<button
					key={num}
					className="aspect-square rounded-xl border border-(--border) bg-(--white) font-bold disabled:opacity-50"
					onClick={() => {
						handleClick(num, multiplier)
						setMultiplier(1)
					}}
					disabled={num * multiplier > 60}
				>
					{num}
				</button>
			))}

			<button
				className={`col-span-2 rounded-xl border border-(--border) bg-(--blue) font-bold ${multiplier === 2 && 'opacity-50'}`}
				onClick={() => setMultiplier(multiplier === 2 ? 1 : 2)}
			>
				DOUBLE
			</button>

			<button
				className={`col-span-2 rounded-xl border border-(--border) bg-(--violet) font-bold ${multiplier === 3 && 'opacity-50'}`}
				onClick={() => setMultiplier(multiplier === 3 ? 1 : 3)}
			>
				TRIPLE
			</button>

			<button
				className="aspect-square rounded-xl border border-(--border) bg-(--red) font-bold disabled:opacity-50"
				onClick={() => {
					setMultiplier(1)
					handleCancel()
				}}
			>
				<i className="fa-solid fa-arrow-rotate-left"></i>
			</button>

			<button
				className="aspect-square rounded-xl border border-(--border) bg-(--green) font-bold disabled:opacity-50"
				onClick={handleSave}
			>
				<i className="fa-solid fa-floppy-disk fa-lg"></i>
			</button>
		</div>
	)
}
