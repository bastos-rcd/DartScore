import { useEffect, useState } from 'react'

import type { Classment } from '@/models/classment'

import Card from '@/components/card'
import RankItem from '@/components/rank/rank-item'
import { gameService } from '@/services/game.service'

export default function RankList() {
	const [classement, setClassement] = useState<Classment[]>([])

	useEffect(() => {
		gameService
			.rank()
			.then((data) => setClassement(data))
			.catch((error) => alert(error.message))
	}, [])

	if (classement.length === 0) {
		return (
			<Card
				title="Aucune partie enregistrée"
				content="Lancez une partie pour ouvrir le classement !"
			/>
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
