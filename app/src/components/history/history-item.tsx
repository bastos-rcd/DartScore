import { type Game } from '@/models/game'
import type { Player } from '@/models/player'

const MEDALS = ['🥇', '🥈', '🥉']

export default function HistoryItem(props: {
	game: Game
	players: Player[]
	onDelete: () => void
}) {
	const podium = [...props.game.rank]
		.sort((a, b) => b.score - a.score)
		.slice(0, 3)

	return (
		<div className="flex cursor-pointer flex-col gap-2 rounded-xl border border-(--border) bg-(--white) p-4">
			<div className="flex flex-row items-start justify-between gap-4">
				<div className="flex flex-col">
					<span className="font-semibold">
						{new Date(props.game.date).toLocaleDateString('fr-FR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
						})}
					</span>
					<span className="font-light">{props.game.type}</span>
				</div>

				<button
					onClick={(e) => {
						e.stopPropagation()
						props.onDelete()
					}}
					className="aspect-square rounded-xl bg-(--red)/40 p-1.5"
				>
					<i className="fa-solid fa-trash"></i>
				</button>
			</div>

			<div className="grid grid-cols-3 gap-1 divide-x divide-(--border)">
				{podium.map((entry, index) => (
					<span key={entry.player} className="text-sm">
						{MEDALS[index]}{' '}
						{props.players.find((p) => p.id === entry.player)?.name ??
							'Inconnu'}
					</span>
				))}
			</div>
		</div>
	)
}
