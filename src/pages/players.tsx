import PlayersCreate from '@/components/players/players-create'
import Divider from '@/components/ui/divider'
import PlayersList from '@/components/players/players-list'

export default function Players() {
	return (
		<>
			<PlayersCreate />

			<Divider />

			<PlayersList />
		</>
	)
}
