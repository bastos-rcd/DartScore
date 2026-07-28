import { useEffect, useState } from 'react'

import { authStore } from '@/store/auth.store'

import type { User } from '@/models/user'

import { userService } from '@/services/user.service'

import Title from '@/components/title'
import Divider from '@/components/divider'

export default function Profile() {
	const { user } = authStore()

	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [profile, setProfile] = useState<Partial<User>>({})

	const handleSubmit = () => {
		setIsLoading(true)

		const update: Partial<User> = {
			id: user?.id,
			username: profile.username,
		}

		if (profile.password && profile.password.trim().length < 8)
			update.password = profile.password

		userService
			.update(update)
			.then(() => {
				window.location.reload()
			})
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false))
	}

	useEffect(() => {
		if (user) {
			setProfile(user)
		}
	}, [user])

	return (
		<>
			<Title title="Mon profil" />

			<Divider />

			<form
				onSubmit={(e) => {
					e.preventDefault()
					handleSubmit()
				}}
				className="flex flex-col gap-4"
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="username" className="font-medium">
						Votre nom
					</label>
					<input
						type="text"
						id="username"
						value={profile.username}
						onChange={(e) =>
							setProfile({ ...profile, username: e.target.value })
						}
						className="rounded-xl border border-(--border) bg-(--white) p-2"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="password" className="font-medium">
						Nouveau mot de passe
					</label>
					<input
						type="password"
						id="password"
						value={profile.password}
						onChange={(e) =>
							setProfile({ ...profile, password: e.target.value })
						}
						className="rounded-xl border border-(--border) bg-(--white) p-2"
					/>
				</div>

				{error && <p className="font-bold text-(--red)">{error}</p>}

				<button
					disabled={
						isLoading ||
						(profile.username === user?.username &&
							(!Object.keys(profile).includes('password') ||
								profile.password?.trim() === ''))
					}
					type="submit"
					className="rounded-2xl bg-(--green) px-2 py-2.5 disabled:bg-(--green)/50"
				>
					Enregistrer
				</button>
			</form>
		</>
	)
}
