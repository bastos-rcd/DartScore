import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@/users/user.entity'

import { Game } from '@/games/game.entity'

@Injectable()
export class GameService {
	constructor(
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
}
