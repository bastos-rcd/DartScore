import { useEffect, useState } from 'react'

import { gameService } from '@/services/game.service'
import { playerService } from '@/services/player.service'

import type { Game } from '@/models/game'
import type { Player } from '@/models/player'
import type { Classment } from '@/models/classment'

export function useClassement() {
	const [classement, setClassement] = useState<Classment[] | null>(null)

	useEffect(() => {
		let currentGames: Game[] = []
		let currentPlayers: Player[] = []

		const computeClassement = () => {
			if (currentGames.length === 0) {
				setClassement([])
				return
			}

			const classments = new Map<string, Classment>()
			currentPlayers.forEach((player) => {
				classments.set(player.id, { player, score: 0, played: 0 })
			})

			currentGames.forEach((game) => {
				game.classment.forEach((entry) => {
					const classment = classments.get(entry.player.id)
					if (classment) {
						classment.score += entry.score
						classment.played += 1
					}
				})
			})

			const sorted = Array.from(classments.values()).sort(
				(a, b) => b.score - a.score || b.played - a.played,
			)
			setClassement(sorted)
		}

		const unsubscribeGames = gameService.getLiveGames((games) => {
			currentGames = games
			computeClassement()
		})

		const unsubscribePlayers = playerService.getLivePlayers((players) => {
			currentPlayers = players
			computeClassement()
		})

		return () => {
			unsubscribeGames()
			unsubscribePlayers()
		}
	}, [])

	return classement
}
