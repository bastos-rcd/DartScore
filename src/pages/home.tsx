import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Player } from '@/models/player'
import { gameStore } from '@/store/game'
import { playerService } from '@/services/player.service'

import Divider from '@/components/divider'

export default function Home() {
	const navigate = useNavigate()

	const { status, setStatus, players, setPlayers, addPlayer, removePlayer } =
		gameStore()

	const [dbPlayers, setDbPlayers] = useState<Player[]>([])

	useEffect(() => {
		if (status) {
			navigate('/game')
			return
		}

		playerService.getPlayers().then((data) => setDbPlayers(data))
	}, [status])

	const handleCheck = (player: Player) => {
		if (players.includes(player)) removePlayer([player])
		else addPlayer([player])
	}

	const handleStart = () => {
		if (players.length === 0) return

		setPlayers(players.toSorted(() => Math.random() - 0.5))
		setStatus(true)
	}

	return (
		<>
			<img src="favicon.svg" className="h-60 w-60 self-center" />

			<Divider />

			<h1 className="text-center">{players.length} joueur(s) sélectionné(s)</h1>

			<div className="flex w-2/3 flex-1 flex-col gap-2 self-center overflow-y-auto">
				{dbPlayers.map((player) => (
					<div
						key={player.id}
						onClick={() => handleCheck(player)}
						className="flex flex-row items-center gap-2 rounded-xl bg-(--border)/60 p-2"
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

			{players.length > 0 && (
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
