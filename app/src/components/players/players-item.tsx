import type { Player } from '@/models/player'

import { playerService } from '@/services/player.service'

export default function PlayersItem(props: {
	player: Player
	edit: () => void
	refresh: () => void
}) {
	const handleDelete = () => {
		if (confirm('Voulez-vous vraiment supprimer ce joueur ?')) {
			playerService
				.remove(props.player.id)
				.then(() => props.refresh())
				.catch((error) => alert(error.message))
		}
	}

	return (
		<div className="flex w-full items-center gap-2 rounded-xl bg-(--border) p-2 text-(--black)">
			<span className="w-full font-bold">{props.player.name}</span>

			<button
				onClick={props.edit}
				className="aspect-square rounded-xl bg-(--yellow) p-1"
			>
				<i className="fa-solid fa-pen"></i>
			</button>

			<button
				onClick={handleDelete}
				className="aspect-square rounded-xl border border-(--border) bg-(--red) p-1"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
		</div>
	)
}
