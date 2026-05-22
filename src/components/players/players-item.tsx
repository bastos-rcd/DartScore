import type { Player } from '@/models/player'
import { playerService } from '@/services/player.service'

export default function PlayersItem(player: Player) {
	const handleDelete = () => {
		if (confirm('Voulez-vous vraiment supprimer ce joueur ?')) {
			playerService.removePlayer(player).catch((error) => {
				alert('Erreur lors de la suppression du joueur')
				console.error(error)
			})
		}
	}

	return (
		<div className="flex w-2/3 items-center gap-2 rounded-xl bg-(--border) p-2 text-(--black)">
			<span className="w-full font-bold">{player.name}</span>

			<button
				onClick={handleDelete}
				className="aspect-square rounded-xl border border-(--border) bg-(--red) p-1"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
		</div>
	)
}
