import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { authStore } from '@/store/auth.store'

export default function Login() {
	const navigate = useNavigate()
	const location = useLocation()

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { login } = authStore()

	const handleSubmit = async () => {
		setIsLoading(true)
		setError('')

		if (email.trim() === '' || password.trim() === '') {
			setError('Veuillez remplir tous les champs')
			setIsLoading(false)
			return
		}

		setIsLoading(false)

		try {
			await login({ email, password })

			const from =
				(location.state as { from?: Location })?.from?.pathname || '/'
			navigate(from, { replace: true })
		} catch (error) {
			setError('Identifiants invalides !')
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
			className="flex flex-1 flex-col justify-center gap-4 overflow-y-auto"
		>
			<h1 className="text-4xl font-bold">Connexion</h1>

			<div className="flex flex-col gap-1">
				<label htmlFor="email" className="font-medium">
					Email
				</label>
				<input
					type="text"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="rounded-xl border border-(--border) bg-(--white) p-2"
				/>
			</div>

			{error && <p className="font-bold text-(--red)">{error}</p>}

			<button
				disabled={isLoading}
				type="submit"
				className="rounded-2xl bg-(--green) px-2 py-2.5 disabled:bg-(--green)/50"
			>
				Se Connecter
			</button>
		</form>
	)
}
