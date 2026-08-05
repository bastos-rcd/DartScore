import { gameStore } from '@/store/game.store'

import Card from '@/components/card'
import Title from '@/components/title'
import Divider from '@/components/divider'

const NUMBERS = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]

export default function KillerSetup() {
	const { killers, setNumber } = gameStore()

	const takenNumbers = killers
		.map((k) => k.number)
		.filter((n): n is number => n !== null)

	const currentKiller = killers.find((k) => k.number == null)

	if (!currentKiller) {
		return null
	}

	return (
		<>
			<Title title={`Partie de KILLER`} />

			<Divider />

			<div className="flex flex-1 flex-col justify-center gap-4 text-center text-xl font-bold">
				<Card title={currentKiller.player.name + ', choisis ton numéro'} />
			</div>

			<Divider />

			<div className="grid grid-cols-7 gap-1">
				{NUMBERS.map((num) => {
					const taken = takenNumbers.includes(num)

					return (
						<button
							key={num}
							disabled={taken}
							onClick={() => setNumber(currentKiller.player.id, num)}
							className="aspect-square rounded-xl border border-(--border) bg-(--white) font-bold disabled:opacity-50"
						>
							{num}
						</button>
					)
				})}
			</div>
		</>
	)
}
