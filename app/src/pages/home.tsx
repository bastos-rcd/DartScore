import { useEffect, useState } from 'react'

import type { Player } from '@/models/player'

import Divider from '@/components/divider'
import { playerService } from '@/services/player.service'
import Card from '@/components/card'

export default function Home() {
	const [dbPlayers, setdbPlayers] = useState<Player[]>([])

	useEffect(() => {
		playerService
			.findAll()
			.then((data) => setdbPlayers(data))
			.catch((error) => console.error(error))
	}, [])

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
					{/* <h1 className="text-center">
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
					</div> */}
				</>
			)}

			{/* {players.length > 0 && (
				<button
					onClick={handleStart}
					className="self-center rounded-xl bg-(--green) px-4 py-2 font-bold"
				>
					JOUER
				</button>
			)} */}
		</>
	)
}
