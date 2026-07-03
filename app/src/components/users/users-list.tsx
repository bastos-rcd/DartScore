import { useEffect, useState } from 'react'

import type { User } from '@/models/user'

import { userService } from '@/services/user.service'

import Card from '@/components/card'
import UsersItem from '@/components/users/users-item'

export default function UsersList(props: {
	refreshing: number
	setEditing: (user: User) => void
}) {
	const [users, setUsers] = useState<User[]>([])

	const refresh = () => {
		userService.findAll().then((data) => setUsers(data))
	}

	useEffect(() => {
		refresh()
	}, [props.refreshing])

	if (users.length === 0) {
		return (
			<Card
				title="Aucun utilisateur enregistré"
				content="Créez un utilisateur pour commencer"
			/>
		)
	}

	return (
		<div className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto">
			{users.map((user) => (
				<UsersItem
					key={user.id}
					user={user}
					edit={() => {
						props.setEditing(user)
					}}
					refresh={refresh}
				/>
			))}
		</div>
	)
}
