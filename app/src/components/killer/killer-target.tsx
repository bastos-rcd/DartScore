import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { gameStore } from '@/store/game.store'

const NUMBERS = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]

export default function KillerTarget() {
	const navigate = useNavigate()

	const { registerHit, saveGame } = gameStore()

	const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1)

	const handleClick = (num: number) => {
		registerHit(num, multiplier)
		setMultiplier(1)
	}

	const handleSave = async () => {
		if (confirm('Voulez-vous arrêter et sauvegarder cette partie ?')) {
			await saveGame()
			navigate('/rank')
		}
	}

	return (
		<div className="grid grid-cols-7 gap-1">
			{NUMBERS.map((num) => (
				<button
					key={num}
					className="aspect-square rounded-xl border border-(--border) bg-(--white) font-bold"
					onClick={() => handleClick(num)}
				>
					{num}
				</button>
			))}

			<button
				className={`col-span-2 rounded-xl border border-(--border) bg-(--blue) font-bold ${multiplier === 2 && 'opacity-50'}`}
				onClick={() => setMultiplier(multiplier === 2 ? 1 : 2)}
			>
				DOUBLE
			</button>

			<button
				className={`col-span-2 rounded-xl border border-(--border) bg-(--violet) font-bold ${multiplier === 3 && 'opacity-50'}`}
				onClick={() => setMultiplier(multiplier === 3 ? 1 : 3)}
			>
				TRIPLE
			</button>

			<button
				className="col-span-2 rounded-xl border border-(--border) bg-(--green) py-2 font-bold"
				onClick={handleSave}
			>
				<i className="fa-solid fa-floppy-disk fa-lg"></i>
			</button>
		</div>
	)
}
