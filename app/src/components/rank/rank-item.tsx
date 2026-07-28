import type { Classment } from '@/models/classment'
import Divider from '../divider'

const Stat = (props: { value: number; label: string }) => {
	return (
		<div>
			<span className="font-bold">{props.value}</span>
			<span className="block opacity-75">{props.label}</span>
		</div>
	)
}

export default function RankItem(props: {
	classement: Classment
	index: number
}) {
	const { classement, index } = props

	const ratio =
		classement.played === 0 ? 0 : classement.score / classement.played

	return (
		<div className="flex flex-col gap-2 rounded-xl border border-(--border) bg-(--white) p-4">
			<div className="flex flex-row items-center justify-between gap-4 font-bold">
				<div className="flex items-center gap-2">
					<span className="flex aspect-square items-center justify-center rounded-xl bg-(--violet)/75 px-2 py-1 text-xl">
						#{index}
					</span>
					<span className="text-xl font-semibold">
						{classement.player.name}
					</span>
				</div>

				<div className="h-full w-20 content-center rounded-xl bg-(--green)/40 p-1 text-center">
					{ratio.toFixed(2)}
				</div>
			</div>

			<Divider />

			<div className="grid grid-cols-3 gap-4 divide-x divide-(--border)">
				<Stat value={classement.score} label="points" />
				<Stat value={classement.podium} label="podiums" />
				<Stat value={classement.played} label="parties" />
			</div>
		</div>
	)
}
