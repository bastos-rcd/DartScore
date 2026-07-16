import { useEffect, useState } from 'react'

import type { Classment } from '@/models/classment'

import { playerService } from '@/services/player.service'

import Card from '@/components/card'
import RankItem from '@/components/rank/rank-item'
import { gameService } from '@/services/game.service'

export default function RankList() {
	const [classement, setClassement] = useState<Classment[]>([])

	useEffect(() => {
		Promise.all([gameService.findAll(), playerService.findAll()])
			.then(([games, players]) => {
				if (games.length === 0) {
					setClassement([])
					return
				}

				const classments = new Map<string, Classment>()
				players.forEach((player) => {
					classments.set(player.id, {
						player,
						score: 0,
						podium: 0,
						played: 0,
					})
				})

				games.forEach((game) => {
					game.rank.forEach((entry) => {
						const classment = classments.get(entry.player)
						if (classment) {
							classment.score += entry.score
							if (entry.score > 0) {
								classment.podium += 1
							}
							classment.played += 1
						}
					})
				})

				const sorted = Array.from(classments.values()).sort((a, b) => {
					const ratioA = a.played === 0 ? 0 : a.score / a.played
					const ratioB = b.played === 0 ? 0 : b.score / b.played

					if (ratioA !== ratioB) return ratioB - ratioA

					return a.played - b.played
				})
				setClassement(sorted)
			})
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
