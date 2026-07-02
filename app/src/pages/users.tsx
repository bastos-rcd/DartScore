import UsersEdit from '@/components/users/users-edit'
import Divider from '@/components/divider'
import UsersList from '@/components/users/users-list'
import { useState } from 'react'
import type { User } from '@/models/user'

export default function Users() {
	const [refreshKey, setRefreshKey] = useState(0)
	const [editing, setEditing] = useState<User>({
		id: '0',
		name: '',
		email: '',
		password: '',
		role: 'USER',
		active: true,
	})

	const refresh = () => {
		setRefreshKey((prev) => prev + 1)
	}

	return (
		<>
			<UsersEdit user={editing} setUser={setEditing} refresh={refresh} />

			<Divider />

			<UsersList setEditing={setEditing} refreshing={refreshKey} />
		</>
	)
}
