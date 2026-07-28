import { useState } from 'react'

import type { User } from '@/models/user'

import Title from '@/components/title'
import Divider from '@/components/divider'

import UsersEdit from '@/components/users/users-edit'
import UsersList from '@/components/users/users-list'

export default function Users() {
	const [refreshKey, setRefreshKey] = useState(0)
	const [editing, setEditing] = useState<User>({
		id: '0',
		username: '',
		password: '',
		role: 'USER',
		active: true,
	})

	const refresh = () => {
		setRefreshKey((prev) => prev + 1)
	}

	return (
		<>
			<Title title="Liste des utilisateurs" />

			<Divider />

			<UsersEdit user={editing} setUser={setEditing} refresh={refresh} />

			<Divider />

			<UsersList setEditing={setEditing} refreshing={refreshKey} />
		</>
	)
}
