import { useClassement } from '@/hooks/useClassement'

import RankItem from '@/components/rank/rank-item'

export default function RankList() {
	const classement = useClassement()

	if (classement === null) {
		return (
			<div className="p-4 text-center font-bold">
				Chargement du classement...
			</div>
		)
	}

	if (classement.length === 0) {
		return (
			<div className="flex flex-col gap-2 rounded-xl border border-(--border) bg-(--white) p-4 text-center">
				<p className="font-bold">Aucune partie enregistrée pour le moment.</p>
				<p className="italic opacity-75">
					Lancez une partie pour ouvrir le classement !
				</p>
			</div>
		)
	}

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
			{classement.map((item, index) => (
				<RankItem key={item.player.id} classement={item} index={index + 1} />
			))}
		</div>
	)
}
