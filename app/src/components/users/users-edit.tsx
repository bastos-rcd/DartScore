import { useState } from 'react'

import type { User } from '@/models/user'

import { userService } from '@/services/user.service'

export default function UsersEdit(props: {
	user: User
	setUser: (user: User) => void
	refresh: () => void
}) {
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = () => {
		setIsLoading(true)

		if (props.user.id === '0') {
			userService
				.create({
					name: props.user.name,
					email: props.user.email,
					password: props.user.password,
				})
				.then(() => {
					props.setUser({
						id: '0',
						name: '',
						email: '',
						password: '',
						role: 'USER',
						active: true,
					})
					props.refresh()
					setError('')
				})
				.catch((error) => setError(error.message))
				.finally(() => setIsLoading(false))
		} else {
			userService
				.update({
					id: props.user.id,
					name: props.user.name,
					email: props.user.email,
					password: props.user.password,
				})
				.then(() => {
					props.setUser({
						id: '0',
						name: '',
						email: '',
						password: '',
						role: 'USER',
						active: true,
					})
					props.refresh()
					setError('')
				})
				.catch((error) => setError(error.message))
				.finally(() => setIsLoading(false))
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col gap-1">
				<label htmlFor="name" className="font-medium">
					Nom de l'utilisateur
				</label>
				<input
					type="text"
					id="email"
					value={props.user.name}
					onChange={(e) =>
						props.setUser({ ...props.user, name: e.target.value })
					}
					className="rounded-xl border border-(--border) bg-(--white) p-2"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="email" className="font-medium">
					Email
				</label>
				<input
					type="text"
					id="email"
					value={props.user.email}
					onChange={(e) =>
						props.setUser({ ...props.user, email: e.target.value })
					}
					className="rounded-xl border border-(--border) bg-(--white) p-2"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="password" className="font-medium">
					Mot de passe
				</label>
				<input
					type="password"
					id="password"
					value={props.user.password}
					onChange={(e) =>
						props.setUser({ ...props.user, password: e.target.value })
					}
					className="rounded-xl border border-(--border) bg-(--white) p-2"
				/>
			</div>

			{error && <p className="font-bold text-(--red)">{error}</p>}

			<button
				disabled={isLoading}
				type="submit"
				className="rounded-2xl bg-(--green) px-2 py-2.5 disabled:bg-(--green)/50"
			>
				{props.user.id != '0' ? 'Modifier' : 'Créer'}
			</button>
		</form>
	)
}
