import type { Message } from '@/models/message'

import { messageService } from '@/services/message.service'

export default function MessagesItem(props: {
	message: Message
	edit: () => void
	refresh: () => void
}) {
	const handleDelete = () => {
		if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
			messageService
				.remove(props.message.id)
				.then(() => props.refresh())
				.catch((error) => alert(error.message))
		}
	}

	return (
		<div className="flex w-full items-start gap-2 rounded-xl bg-(--border) p-2 text-(--black)">
			<div className="flex w-full flex-col gap-1">
				<div className="flex items-center gap-2">
					<span className="rounded-xl bg-(--blue) p-1 font-bold">
						{props.message.type}
					</span>
					<span className="rounded-xl bg-(--violet) p-1">
						{props.message.event}
					</span>
				</div>

				<div className="w-full wrap-anywhere">{props.message.text}</div>
			</div>

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
