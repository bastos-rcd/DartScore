import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TYPES, type Type } from '@/models/game'
import type { Player } from '@/models/player'

import { playerService } from '@/services/player.service'
import { gameStore } from '@/store/game.store'

import Card from '@/components/card'
import Divider from '@/components/divider'

export default function Home() {
	const navigate = useNavigate()

	const [dbPlayers, setdbPlayers] = useState<Player[]>([])

	const {
		status,
		setStatus,
		type,
		setType,
		players,
		setPlayers,
		addPlayer,
		removePlayer,
	} = gameStore()

	const handleSelect = (player: Player) => {
		const isSelected = players.some((p) => p.id === player.id)

		if (isSelected) {
			const playerToRemove = players.find((p) => p.id === player.id)
			if (playerToRemove) removePlayer(playerToRemove)
		} else {
			addPlayer(player)
		}
	}

	const handleStart = () => {
		if (players.length === 0) return

		setPlayers(players.toSorted(() => Math.random() - 0.5))
		setStatus(true)
	}

	useEffect(() => {
		playerService
			.findAll()
			.then((data) => setdbPlayers(data))
			.catch((error) => console.error(error))
	}, [])

	useEffect(() => {
		if (!status) return

		if (type == TYPES.X301 || type == TYPES.X501) navigate(`/game`)
		else if (type == TYPES.KILLER) navigate(`/killer`)
	}, [status])

	return (
		<>
			<img src="favicon.svg" className="h-60 w-60 self-center" />

			<Divider />

			{dbPlayers?.length == 0 ? (
				<Card
					title="Aucun joueur enregistré"
					content="Créez un joueur pour commencer"
				/>
			) : (
				<>
					<div className="flex w-full flex-row items-center justify-between">
						<h1 className="text-2xl font-bold">
							{players.length} joueur(s) sélectionné(s)
						</h1>

						<button
							onClick={handleStart}
							disabled={players.length == 0}
							className="aspect-square self-center rounded-xl bg-(--green) p-2 font-bold disabled:bg-(--green)/50"
						>
							<i className="fa-solid fa-play"></i>
						</button>
					</div>

					<div className="flex w-full flex-row items-center justify-between gap-1">
						<label htmlFor="type" className="text-xl font-bold">
							Type de partie
						</label>
						<select
							id="type"
							value={type}
							onChange={(e) => setType(e.target.value as Type)}
							className="rounded-xl border border-(--border) bg-(--white) p-2"
						>
							{Object.values(TYPES).map((gameType) => (
								<option key={gameType} value={gameType}>
									{gameType}
								</option>
							))}
						</select>
					</div>

					<Divider />

					<div className="grid w-full grid-cols-2 gap-4 self-center overflow-y-auto">
						{dbPlayers?.map((player) => (
							<div
								key={player.id}
								onClick={() => handleSelect(player)}
								className="flex h-fit flex-row items-center gap-2 rounded-xl bg-(--border)/60 p-2"
							>
								{players.includes(player) ? (
									<i className="fa-solid fa-circle-check fa-lg"></i>
								) : (
									<i className="fa-regular fa-circle fa-lg"></i>
								)}

								<span className="font-semibold">{player.name}</span>
							</div>
						))}
					</div>
				</>
			)}
		</>
	)
}
