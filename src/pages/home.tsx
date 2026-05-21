import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { User } from '@/models/user'
import { gameStore } from '@/store/game'
import { getUsers } from '@/services/user.service'

import Divider from '@/components/ui/divider'

export default function Home() {
	const navigate = useNavigate()

	const { status, setStatus, users, setUsers, addUser, removeUser } =
		gameStore()

	const [dbUsers, setDbUsers] = useState<User[]>([])

	useEffect(() => {
		if (status) {
			navigate('/game')
			return
		}

		getUsers().then((res) => setDbUsers(res))
	}, [status])

	const handleCheck = (user: User) => {
		if (users.includes(user)) removeUser([user])
		else addUser([user])
	}

	const handleStart = () => {
		if (users.length === 0) return

		setUsers(users.toSorted(() => Math.random() - 0.5))
		setStatus(true)
	}

	return (
		<>
			<img src="favicon.svg" className="h-60 w-60 self-center" />

			<Divider />

			<h1 className="text-center">{users.length} joueur(s) sélectionné(s)</h1>

			<div className="flex w-2/3 flex-1 flex-col gap-2 self-center overflow-y-auto">
				{dbUsers.map((user) => (
					<div
						key={user.id}
						onClick={() => handleCheck(user)}
						className="flex flex-row items-center gap-2 rounded-xl bg-(--border)/60 p-2"
					>
						{users.includes(user) ? (
							<i className="fa-solid fa-circle-check fa-lg"></i>
						) : (
							<i className="fa-regular fa-circle fa-lg"></i>
						)}

						<span className="font-semibold">{user.name}</span>
					</div>
				))}
			</div>

			{users.length > 0 && (
				<button
					onClick={handleStart}
					className="self-center rounded-xl bg-(--green) px-4 py-2 font-bold"
				>
					JOUER
				</button>
			)}
		</>
	)
}
