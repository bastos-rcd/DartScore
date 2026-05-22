import { useLiveQuery } from 'dexie-react-hooks'

import type { Classment } from '@/models/classment'
import { gameService } from '@/services/game.service'
import { playerService } from '@/services/player.service'

import RankItem from './rank-item'

function useClassement() {
	return useLiveQuery(async () => {
		const games = await gameService.getGames()
		const players = await playerService.getPlayers()

		const classments = new Map<string, Classment>()
		players.forEach((player) => {
			classments.set(player.id, { player, score: 0, played: 0 })
		})

		games.forEach((game) => {
			game.classment.forEach((entry) => {
				const classment = classments.get(entry.player.id)

				if (classment) {
					classment.score += entry.score
					classment.played += 1
				}
			})
		})

		return Array.from(classments.values()).sort(
			(a, b) => b.score - a.score || b.played - a.played,
		)
	}, [])
}

export default function RankList() {
	const classement = useClassement()

	if (classement?.length === 0) {
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
			{classement?.map((classement, index) => (
				<RankItem
					key={classement.player.id}
					classement={classement}
					index={index + 1}
				/>
			))}
		</div>
	)
}
