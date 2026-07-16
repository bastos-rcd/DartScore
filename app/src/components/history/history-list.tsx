import { useEffect, useState } from 'react'

import type { Game } from '@/models/game'
import type { Player } from '@/models/player'

import { gameService } from '@/services/game.service'
import { playerService } from '@/services/player.service'

import Card from '@/components/card'
import HistoryItem from './history-item'

export default function HistoryList() {
	const [games, setGames] = useState<Game[]>([])
	const [players, setPlayers] = useState<Player[]>([])

	const handleDelete = (game: Game) => {
		if (confirm('Voulez-vous vraiment supprimer cette partie ?')) {
			gameService
				.remove(game.id)
				.then(() => setGames(games.filter((g) => g.id !== game.id)))
				.catch((error) => alert(error.message))
		}
	}

	useEffect(() => {
		Promise.all([gameService.findAll(), playerService.findAll()])
			.then(([games, players]) => {
				const sorted = [...games].sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				)
				setGames(sorted)
				setPlayers(players)
			})
			.catch((error) => alert(error.message))
	}, [])

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
			{games.length === 0 ? (
				<Card
					title="Aucune partie enregistrée"
					content="L'historique apparaîtra ici après une partie !"
				/>
			) : (
				games.map((game) => (
					<HistoryItem
						key={game.id}
						game={game}
						players={players}
						onDelete={() => handleDelete(game)}
					/>
				))
			)}
		</div>
	)
}
