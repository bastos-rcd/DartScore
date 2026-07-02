import { useState } from 'react'

import type { Player } from '@/models/player'

import PlayersCreate from '@/components/players/player-create'
import Divider from '@/components/divider'
import PlayersList from '@/components/players/players-list'

export default function Players() {
	const [refreshKey, setRefreshKey] = useState(0)
	const [editing, setEditing] = useState<Player>({
		id: '0',
		name: '',
	})

	const refresh = () => {
		setRefreshKey((prev) => prev + 1)
	}

	return (
		<>
			<PlayersCreate
				player={editing}
				setPlayer={setEditing}
				refresh={refresh}
			/>

			<Divider />

			<PlayersList setEditing={setEditing} refreshing={refreshKey} />
		</>
	)
}
