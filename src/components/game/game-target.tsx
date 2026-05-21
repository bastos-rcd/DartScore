import { gameStore } from '@/store/game'

const SECTORS = [
	20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
]

const getCoordinates = (percent: number) => {
	const x = Math.cos(2 * Math.PI * percent)
	const y = Math.sin(2 * Math.PI * percent)
	return [x, y]
}

export default function GameTarget(props: { playerId: string }) {
	const { addDart } = gameStore()

	const handleClick = (value: number, multiplier: number) => {
		const totalScore = value * multiplier

		let label = `${totalScore}`

		if (multiplier === 2) label = `D${value}`
		if (multiplier === 3) label = `T${value}`

		addDart({
			id: crypto.randomUUID(),
			label,
			score: totalScore,
			playerId: props.playerId,
		})
	}

	return (
		<svg viewBox="-250 -250 500 500">
			<circle
				cx="0"
				cy="0"
				r="240"
				fill="var(--black)"
				onClick={() => handleClick(0, 1)}
			/>

			{SECTORS.map((number, index) => {
				const startPercent = (index - 0.5) / 20 - 0.25
				const endPercent = (index + 0.5) / 20 - 0.25

				const [startX, startY] = getCoordinates(startPercent)
				const [endX, endY] = getCoordinates(endPercent)

				const isEven = index % 2 === 0
				const sectorColor = isEven ? 'var(--black)' : 'var(--background)'
				const ringColor = isEven ? 'var(--red)' : 'var(--green)'

				const rDouble = 200
				const rTriple = 130

				return (
					<g key={number} className="group">
						<path
							d={`M ${startX * rDouble} ${startY * rDouble} A ${rDouble} ${rDouble} 0 0 1 ${endX * rDouble} ${endY * rDouble} L ${endX * (rDouble - 15)} ${endY * (rDouble - 15)} A ${rDouble - 15} ${rDouble - 15} 0 0 0 ${startX * (rDouble - 15)} ${startY * (rDouble - 15)} Z`}
							fill={ringColor}
							onClick={(e) => {
								e.stopPropagation()
								handleClick(number, 2)
							}}
						/>

						<path
							d={`M ${startX * (rDouble - 15)} ${startY * (rDouble - 15)} A ${rDouble - 15} ${rDouble - 15} 0 0 1 ${endX * (rDouble - 15)} ${endY * (rDouble - 15)} L ${endX * rTriple} ${endY * rTriple} A ${rTriple} ${rTriple} 0 0 0 ${startX * rTriple} ${startY * rTriple} Z`}
							fill={sectorColor}
							onClick={(e) => {
								e.stopPropagation()
								handleClick(number, 1)
							}}
						/>

						<path
							d={`M ${startX * rTriple} ${startY * rTriple} A ${rTriple} ${rTriple} 0 0 1 ${endX * rTriple} ${endY * rTriple} L ${endX * (rTriple - 15)} ${endY * (rTriple - 15)} A ${rTriple - 15} ${rTriple - 15} 0 0 0 ${startX * (rTriple - 15)} ${startY * (rTriple - 15)} Z`}
							fill={ringColor}
							onClick={(e) => {
								e.stopPropagation()
								handleClick(number, 3)
							}}
						/>

						<path
							d={`M ${startX * (rTriple - 15)} ${startY * (rTriple - 15)} A ${rTriple - 15} ${rTriple - 15} 0 0 1 ${endX * (rTriple - 15)} ${endY * (rTriple - 15)} L ${endX * 30} ${endY * 30} A 30 30 0 0 0 ${startX * 30} ${startY * 30} Z`}
							fill={sectorColor}
							onClick={(e) => {
								e.stopPropagation()
								handleClick(number, 1)
							}}
						/>

						<text
							x={startX * 220 + (endX - startX) * 110}
							y={startY * 220 + (endY - startY) * 110}
							fill="var(--white)"
							textAnchor="middle"
							dominantBaseline="central"
							className="font-bold"
						>
							{number}
						</text>
					</g>
				)
			})}

			<circle
				cx="0"
				cy="0"
				r="30"
				fill="var(--green)"
				onClick={(e) => {
					e.stopPropagation()
					handleClick(25, 1)
				}}
			/>

			<circle
				cx="0"
				cy="0"
				r="12"
				fill="var(--red)"
				onClick={(e) => {
					e.stopPropagation()
					handleClick(25, 2)
				}}
			/>
		</svg>
	)
}
