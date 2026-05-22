import { useLiveQuery } from 'dexie-react-hooks'

import { playerService } from '@/services/player.service'

import PlayersItem from './players-item'

export default function PlayersList() {
	const players = useLiveQuery(() => playerService.getPlayers())

	return (
		<div className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto">
			{players?.map((player) => (
				<PlayersItem key={player.id} {...player} />
			))}
		</div>
	)
}
