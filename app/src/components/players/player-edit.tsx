import { useState } from 'react'

import type { Player } from '@/models/player'

import { playerService } from '@/services/player.service'

export default function PlayersEdit(props: {
	player: Player
	setPlayer: (player: Player) => void
	refresh: () => void
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = () => {
		setIsLoading(true)

		if (props.player.id === '0') {
			playerService
				.create({
					name: props.player.name,
				})
				.then(() => {
					props.setPlayer({
						id: '0',
						name: '',
					})
					props.refresh()
				})
				.catch((error) => alert(error.message))
				.finally(() => setIsLoading(false))
		} else {
			playerService
				.update({
					id: props.player.id,
					name: props.player.name,
				})
				.then(() => {
					props.setPlayer({
						id: '0',
						name: '',
					})
					props.refresh()
				})
				.catch((error) => alert(error.message))
				.finally(() => setIsLoading(false))
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
			className="flex flex-row items-end gap-4"
		>
			<div className="flex w-full flex-col gap-1">
				<label htmlFor="name" className="font-medium">
					Nom du joueur
				</label>
				<input
					type="text"
					id="name"
					value={props.player.name}
					onChange={(e) =>
						props.setPlayer({ ...props.player, name: e.target.value })
					}
					className="rounded-xl border border-(--border) bg-(--white) p-2"
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="rounded-xl bg-(--blue) px-2 py-2.5 disabled:bg-(--blue)/50"
			>
				{props.player.id === '0' ? (
					<i className="fa-solid fa-plus fa-lg"></i>
				) : (
					<i className="fa-solid fa-floppy-disk fa-lg"></i>
				)}
			</button>
		</form>
	)
}
