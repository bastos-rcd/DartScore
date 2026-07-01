import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Player } from '@/models/player'
import { gameStore } from '@/store/game'
import { usePlayers } from '@/hooks/usePlayers'

import Divider from '@/components/divider'

export default function Home() {
	const navigate = useNavigate()
	const { players: dbPlayers, loading } = usePlayers()

	const { status, setStatus, players, setPlayers, addPlayer, removePlayer } =
		gameStore()

	useEffect(() => {
		if (status) {
			navigate('/game')
			return
		}
	}, [status, navigate])

	const handleCheck = (player: Player) => {
		const isSelected = players.some((p) => p.id === player.id)

		if (isSelected) {
			const playerToRemove = players.find((p) => p.id === player.id)
			if (playerToRemove) removePlayer([playerToRemove])
		} else {
			addPlayer([player])
		}
	}

	const handleStart = () => {
		if (players.length === 0) return

		setPlayers(players.toSorted(() => Math.random() - 0.5))
		setStatus(true)
	}

	if (loading) {
		return <div className="text-center font-bold">Chargement en cours...</div>
	}

	return (
		<>
			<img src="favicon.svg" className="h-60 w-60 self-center" />

			<Divider />

			{dbPlayers?.length == 0 ? (
				<div className="flex flex-col gap-2 rounded-xl border border-(--border) bg-(--white) p-4 text-center">
					<p className="font-bold">Aucun joueur enregistré pour le moment.</p>

					<p className="italic opacity-75">
						Ajoutez un joueur pour commencer !
					</p>
				</div>
			) : (
				<>
					<h1 className="text-center">
						{players.length} joueur(s) sélectionné(s)
					</h1>

					<div className="flex w-2/3 flex-1 flex-col gap-2 self-center overflow-y-auto">
						{dbPlayers?.map((player) => (
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
				</>
			)}

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
