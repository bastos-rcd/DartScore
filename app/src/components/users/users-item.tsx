import type { User } from '@/models/user'

import { userService } from '@/services/user.service'

export default function UsersItem(props: {
	user: User
	edit: () => void
	refresh: () => void
}) {
	const handleToggle = () => {
		userService
			.update({ id: props.user.id, active: !props.user.active })
			.then(() => props.refresh())
			.catch((error) => alert(error.message))
	}

	const handleDelete = () => {
		if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
			userService
				.remove(props.user.id)
				.then(() => {
					props.refresh()
				})
				.catch((error) => {
					alert(error.message)
				})
		}
	}

	return (
		<div className="flex w-full items-center gap-2 rounded-xl bg-(--border) p-2 text-(--black)">
			<div className="flex w-full flex-col gap-1">
				<span className="w-full text-xl font-bold">{props.user.name}</span>

				<span className="w-full">{props.user.email}</span>
			</div>

			<button
				onClick={handleToggle}
				className="aspect-square rounded-xl bg-(--white) p-1"
			>
				{props.user.active ? (
					<i className="fa-solid fa-toggle-on"></i>
				) : (
					<i className="fa-solid fa-toggle-off"></i>
				)}
			</button>

			<button
				onClick={props.edit}
				className="aspect-square rounded-xl bg-(--yellow) p-1"
			>
				<i className="fa-solid fa-pen"></i>
			</button>

			<button
				onClick={handleDelete}
				className="aspect-square rounded-xl bg-(--red) p-1"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
		</div>
	)
}
