import { gameStore } from '@/store/game.store'

export default function KillerScore() {
	const { killers, currentKiller } = gameStore()

	const active = killers.filter((k) => k.lives > 0)
	const current = active[currentKiller % active.length]

	return (
		<div className="flex flex-1 flex-col gap-2 overflow-y-auto">
			{killers.map((k) => {
				const isCurrent = k.player.id === current?.player.id
				const isDead = k.lives === 0
				const isKiller = k.hits === 3

				return (
					<div
						key={k.player.id}
						className={`flex flex-row items-center justify-between gap-2 rounded-xl border border-(--border) p-2 transition-colors ${
							isDead
								? 'border-(--border) bg-(--red)/50'
								: isCurrent
									? 'bg-(--yellow)/50'
									: ''
						}`}
					>
						<div className="flex flex-row items-center gap-2">
							<span className="font-bold">{k.player.name}</span>
							<span className="text-sm opacity-75">#{k.number}</span>
							{isKiller && (
								<i
									className="fa-solid fa-skull"
									style={{ color: 'var(--red)' }}
								></i>
							)}
						</div>

						<div className="flex flex-row items-center gap-4">
							<div className="flex flex-row items-center gap-1">
								<i className="fa-solid fa-bullseye"></i>
								<span className="text-sm font-bold">{k.hits}/3</span>
							</div>

							<div className="flex flex-row gap-1">
								{Array.from({ length: 3 }).map((_, i) => (
									<i
										key={i}
										className="fa-solid fa-heart"
										style={{
											color: i < k.lives ? 'var(--red)' : 'var(--border)',
										}}
									></i>
								))}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
