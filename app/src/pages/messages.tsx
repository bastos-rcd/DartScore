import { useState } from 'react'

import type { Message } from '@/models/message'

import Title from '@/components/title'
import Divider from '@/components/divider'

import MessagesEdit from '@/components/messages/messages-edit'
import MessagesList from '@/components/messages/messages-list'

export default function Messages() {
	const [refreshKey, setRefreshKey] = useState(0)
	const [editing, setEditing] = useState<Message>({
		id: '0',
		type: 'X01',
		event: 'low',
		text: '',
	})

	const refresh = () => {
		setRefreshKey((prev) => prev + 1)
	}

	return (
		<>
			<Title title="Liste des messages" />

			<Divider />

			<MessagesEdit
				message={editing}
				setMessage={setEditing}
				refresh={refresh}
			/>

			<Divider />

			<MessagesList setEditing={setEditing} refreshing={refreshKey} />
		</>
	)
}
