import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { gameStore } from '@/store/game.store'

export default function KillerTarget() {
	const navigate = useNavigate()

	const { killers, registerHit, saveGame } = gameStore()

	const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1)

	const targets = killers
		.filter((k) => k.number !== null)
		.map((k) => ({
			number: k.number!,
			name: k.player.name,
			dead: k.lives === 0,
		}))
		.sort((a, b) => a.number - b.number)

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
		<div className="flex flex-col gap-1">
			<div className="grid grid-cols-4 gap-1">
				{targets.map((target) => (
					<button
						key={target.number}
						className={`flex h-14 flex-col items-center justify-center rounded-xl border border-(--border) bg-(--white) leading-tight ${target.dead && 'opacity-50'}`}
						onClick={() => handleClick(target.number)}
					>
						<span className="text-lg font-bold">{target.number}</span>
						<span className="w-full truncate px-1 text-xs opacity-75">
							{target.name}
						</span>
					</button>
				))}

				<button
					className="h-14 rounded-xl border border-(--border) bg-(--red) font-bold"
					onClick={() => handleClick(0)}
				>
					<i className="fa-solid fa-xmark fa-lg"></i>
				</button>
			</div>

			<div className="grid grid-cols-3 gap-1">
				<button
					className={`rounded-xl border border-(--border) bg-(--blue) py-2 font-bold ${multiplier === 2 && 'opacity-50'}`}
					onClick={() => setMultiplier(multiplier === 2 ? 1 : 2)}
				>
					DOUBLE
				</button>

				<button
					className={`rounded-xl border border-(--border) bg-(--violet) py-2 font-bold ${multiplier === 3 && 'opacity-50'}`}
					onClick={() => setMultiplier(multiplier === 3 ? 1 : 3)}
				>
					TRIPLE
				</button>

				<button
					className="rounded-xl border border-(--border) bg-(--green) py-2 font-bold"
					onClick={handleSave}
				>
					<i className="fa-solid fa-floppy-disk fa-lg"></i>
				</button>
			</div>
		</div>
	)
}
