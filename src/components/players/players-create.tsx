import { useState } from 'react'

import { playerService } from '@/services/player.service'

export default function PlayersCreate() {
	const [name, setName] = useState<string>('')

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault()

		if (!name.trim()) {
			alert('Veuillez saisir un nom !')
			return
		}

		playerService
			.addPlayer({ id: '', name: name.trim() })
			.then(() => {
				setName('')
			})
			.catch((error) => {
				alert("Erreur lors de l'ajout du joueur !")
				console.error(error)
			})
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-row items-center justify-center gap-4"
		>
			<input
				type="text"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Nom du joueur"
				className="rounded-xl border border-(--border) bg-(--white) p-2"
			/>

			<button
				type="submit"
				className="aspect-square h-full rounded-xl border border-(--border) bg-(--blue)"
			>
				<i className="fa-solid fa-circle-plus fa-lg"></i>
			</button>
		</form>
	)
}
