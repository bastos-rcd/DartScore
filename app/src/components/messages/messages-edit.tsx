import { useState } from 'react'

import {
	EVENTS,
	TYPES,
	type Event,
	type Message,
	type Type,
} from '@/models/message'

import { messageService } from '@/services/message.service'

export default function MessagesEdit(props: {
	message: Message
	setMessage: (message: Message) => void
	refresh: () => void
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = () => {
		setIsLoading(true)

		if (props.message.id === '0') {
			messageService
				.create({
					type: props.message.type,
					event: props.message.event,
					text: props.message.text,
				})
				.then(() => {
					props.setMessage({
						id: '0',
						type: 'X01',
						event: 'low',
						text: '',
					})
					props.refresh()
				})
				.catch((error) => alert(error.message))
				.finally(() => setIsLoading(false))
		} else {
			messageService
				.update({
					id: props.message.id,
					type: props.message.type,
					event: props.message.event,
					text: props.message.text,
				})
				.then(() => {
					props.setMessage({
						id: '0',
						type: 'X01',
						event: 'low',
						text: '',
					})
					props.refresh()
				})
				.catch((error) => alert(error.message))
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
			<div className="flex flex-row items-end gap-4">
				<div className="flex w-full flex-col gap-1">
					<label htmlFor="type" className="text-xl font-bold">
						Type
					</label>
					<select
						id="type"
						value={props.message.type}
						onChange={(e) =>
							props.setMessage({
								...props.message,
								type: e.target.value as Type,
							})
						}
						className="rounded-xl border border-(--border) bg-(--white) p-2"
					>
						{Object.values(TYPES).map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>

				<div className="flex w-full flex-col gap-1">
					<label htmlFor="event" className="text-xl font-bold">
						Catégorie
					</label>
					<select
						id="event"
						value={props.message.event}
						onChange={(e) =>
							props.setMessage({
								...props.message,
								event: e.target.value as Event,
							})
						}
						className="rounded-xl border border-(--border) bg-(--white) p-2"
					>
						{Object.values(EVENTS).map((event) => (
							<option key={event} value={event}>
								{event}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="rounded-xl bg-(--blue) px-2 py-2.5 disabled:bg-(--blue)/50"
				>
					{props.message.id === '0' ? (
						<i className="fa-solid fa-plus fa-lg"></i>
					) : (
						<i className="fa-solid fa-floppy-disk fa-lg"></i>
					)}
				</button>
			</div>

			<div className="flex w-full flex-col gap-1">
				<label htmlFor="text" className="font-medium">
					Texte du message
				</label>
				<input
					type="text"
					id="text"
					value={props.message.text}
					onChange={(e) =>
						props.setMessage({ ...props.message, text: e.target.value })
					}
					className="rounded-xl border border-(--border) bg-(--white) p-2"
				/>
			</div>
		</form>
	)
}
