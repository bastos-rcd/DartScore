import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@/users/user.entity'

import { PlayerService } from '@/players/player.service'

import { Classment, Game } from '@/games/game.entity'

@Injectable()
export class GameService {
	constructor(
		private readonly playerService: PlayerService,
		@InjectRepository(Game)
		private readonly repo: Repository<Game>,
	) {}

	async findAll(user: User): Promise<Game[]> {
		return this.repo.find({
			where: { userId: user.id },
			order: { date: 'DESC' },
		})
	}

	async findById(user: User, id: number): Promise<Game> {
		const game = await this.repo.findOne({
			where: { id, userId: user.id },
		})

		if (!game) throw new NotFoundException('Partie introuvable !')

		return game
	}

	async create(user: User, dto: Partial<Game>): Promise<Game> {
		if (!dto.type || !dto.rank)
			throw new BadRequestException('Données requises manquantes !')

		const create = this.repo.create({
			...dto,
			userId: user.id,
		})

		return await this.repo.save(create)
	}

	async delete(user: User, id: number): Promise<Game> {
		const game = await this.repo.findOne({
			where: { id, userId: user.id },
		})

		if (!game) throw new NotFoundException('Partie introuvable !')

		return await this.repo.remove(game)
	}

	async rank(user: User): Promise<Classment[]> {
		const classments = new Map<string, Classment>()

		const games = await this.repo.find({
			where: { userId: user.id },
			order: { date: 'DESC' },
		})

		if (games.length === 0) {
			return []
		}

		const players = await this.playerService.findAll(user)
		players.forEach((player) => {
			classments.set(player.id.toString(), {
				player,
				score: 0,
				podium: 0,
				played: 0,
			})
		})

		games.forEach((game) => {
			game.rank.forEach((entry) => {
				const classment = classments.get(entry.player.toString())
				if (classment) {
					classment.score += entry.score
					if (entry.score > 0) {
						classment.podium += 1
					}
					classment.played += 1
				}
			})
		})

		const sorted = Array.from(classments.values()).sort((a, b) => {
			const ratioA = a.played === 0 ? 0 : a.score / a.played
			const ratioB = b.played === 0 ? 0 : b.score / b.played

			if (ratioA !== ratioB) return ratioB - ratioA

			return a.played - b.played
		})

		return sorted
	}
}
