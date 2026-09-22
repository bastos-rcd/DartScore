import { useEffect, useState } from 'react'

import {
	EVENTS,
	TYPES,
	type Event,
	type Message,
	type Type,
} from '@/models/message'

import { messageService } from '@/services/message.service'

import Card from '@/components/card'
import MessagesItem from '@/components/messages/messages-item'

export default function MessagesList(props: {
	refreshing: number
	setEditing: (message: Message) => void
}) {
	const [type, setType] = useState<Type | ''>('')
	const [event, setEvent] = useState<Event | ''>('')
	const [messages, setMessages] = useState<Message[]>([])

	const refresh = () => {
		messageService.findAll().then((data) => setMessages(data))
	}

	useEffect(() => {
		refresh()
	}, [props.refreshing])

	const filtered = messages.filter((message) => {
		const matchesType = !type || message.type === type
		const matchesEvent = !event || message.event === event

		return matchesType && matchesEvent
	})

	return (
		<>
			<div className="flex w-full flex-row items-center gap-2">
				<div className="flex flex-col gap-1">
					<label htmlFor="type" className="font-bold">
						Type
					</label>
					<select
						id="type"
						value={type}
						onChange={(e) => setType(e.target.value as Type)}
						className="rounded-xl border border-(--border) bg-(--white) p-1"
					>
						<option value="">ALL</option>
						{Object.values(TYPES).map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="event" className="font-bold">
						Catégorie
					</label>
					<select
						id="event"
						value={event}
						onChange={(e) => setEvent(e.target.value as Event)}
						className="rounded-xl border border-(--border) bg-(--white) p-1"
					>
						<option value="">ALL</option>
						{Object.values(EVENTS).map((event) => (
							<option key={event} value={event}>
								{event}
							</option>
						))}
					</select>
				</div>
			</div>

			{filtered.length === 0 ? (
				<Card
					title="Aucun message enregistré"
					content="Créez un message pour commencer"
				/>
			) : (
				<div className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto">
					{filtered.map((message) => (
						<MessagesItem
							key={message.id}
							message={message}
							edit={() => {
								props.setEditing(message)
							}}
							refresh={refresh}
						/>
					))}
				</div>
			)}
		</>
	)
}
