import { useEffect, useState } from 'react'

import type { Player } from '@/models/player'

import { playerService } from '@/services/player.service'

import PlayersItem from '@/components/players/players-item'

export default function PlayersList(props: {
	refreshing: number
	setEditing: (player: Player) => void
}) {
	const [players, setPlayers] = useState<Player[]>([])

	const refresh = () => {
		playerService.findAll().then((data) => setPlayers(data))
	}

	useEffect(() => {
		refresh()
	}, [props.refreshing])

	if (players.length === 0) {
		return (
			<div className="flex flex-col gap-2 rounded-xl border border-(--border) bg-(--white) p-4 text-center">
				<p className="font-bold">Aucun joueur enregistré pour le moment.</p>
				<p className="italic opacity-75">Créez un joueur pour commencer !</p>
			</div>
		)
	}

	return (
		<div className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto">
			{players.map((player) => (
				<PlayersItem
					key={player.id}
					player={player}
					edit={() => {
						props.setEditing(player)
					}}
					refresh={refresh}
				/>
			))}
		</div>
	)
}
