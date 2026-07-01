import type { Classment } from '@/models/classment'

export default function RankItem(props: {
	classement: Classment
	index: number
}) {
	const { classement, index } = props

	return (
		<div className="flex flex-row items-center justify-between gap-4 rounded-xl border border-(--border) bg-(--white) p-4">
			<div className="flex items-center gap-2">
				<h1 className="flex aspect-square items-center justify-center rounded-full bg-(--violet) px-2 py-1">
					#{index}
				</h1>
				<h1>{classement.player.name}</h1>
			</div>

			<div className="flex flex-row items-center gap-4 text-right">
				<div>
					<span className="font-bold">{classement.score}</span>
					<span className="block opacity-75">points</span>
				</div>

				<div className="border-l border-(--border) pl-4">
					<span className="font-bold">{classement.played}</span>
					<span className="block opacity-75">parties</span>
				</div>
			</div>
		</div>
	)
}
