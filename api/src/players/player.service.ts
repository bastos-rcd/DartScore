import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@/users/user.entity'

import { Player } from '@/players/player.entity'

@Injectable()
export class PlayerService {
	constructor(
		@InjectRepository(Player)
		private readonly repo: Repository<Player>,
	) {}

	async findAll(user: User): Promise<Player[]> {
		return this.repo.find({ where: { userId: user.id } })
	}

	async findById(user: User, id: number): Promise<Player> {
		const player = await this.repo.findOne({
			where: { id, userId: user.id },
		})

		if (!player) throw new NotFoundException('Joueur introuvable !')

		return player
	}

	async create(user: User, dto: Partial<Player>): Promise<Player> {
		if (!dto.name)
			throw new BadRequestException('Données requises manquantes !')

		const player = await this.repo.findOne({
			where: { name: dto.name, userId: user.id },
		})

		if (player) throw new ConflictException('Joueur déjà existant !')

		const create = this.repo.create({
			...dto,
			userId: user.id,
		})

		return await this.repo.save(create)
	}

	async update(user: User, id: number, dto: Partial<Player>): Promise<Player> {
		const player = await this.repo.findOne({
			where: { id, userId: user.id },
		})

		if (!player) throw new NotFoundException('Joueur introuvable !')

		const existing = await this.repo.findOne({
			where: { name: dto.name, userId: user.id },
		})

		if (existing && existing.id !== id)
			throw new ConflictException('Joueur déjà existant !')

		return await this.repo.save({ ...player, ...dto })
	}

	async delete(user: User, id: number): Promise<Player> {
		const player = await this.repo.findOne({
			where: { id, userId: user.id },
		})

		if (!player) throw new NotFoundException('Joueur introuvable !')

		return await this.repo.remove(player)
	}
}
