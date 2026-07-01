import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import * as bcrypt from 'bcrypt'

import { User } from '@/users/user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly repo: Repository<User>,
	) {}

	async findAll(): Promise<User[]> {
		return this.repo.find({ where: { role: 'USER' } })
	}

	async findById(id: number): Promise<User> {
		const user = await this.repo.findOne({
			where: { id, role: 'USER' },
		})

		if (!user) {
			throw new NotFoundException('Utilisateur introuvable !')
		}

		return user
	}

	async create(dto: Partial<User>): Promise<User> {
		if (!dto.name || !dto.email || !dto.password) {
			throw new BadRequestException('Données requises manquantes !')
		}

		const user = await this.repo.findOne({ where: { email: dto.email } })

		if (user) {
			throw new ConflictException('Email déjà existant !')
		}

		const hashed = await bcrypt.hash(dto.password, 10)

		const create = this.repo.create({
			...dto,
			password: hashed,
		})

		return await this.repo.save(create)
	}

	async update(id: number, dto: Partial<User>): Promise<User> {
		const user = await this.repo.findOne({
			where: { id, role: 'USER' },
		})

		if (!user) {
			throw new NotFoundException('Utilisateur introuvable !')
		}

		if (dto.password) {
			dto.password = await bcrypt.hash(dto.password, 10)
		}

		return await this.repo.save({ ...user, ...dto })
	}

	async delete(id: number): Promise<User> {
		const user = await this.repo.findOne({
			where: { id, role: 'USER' },
		})

		if (!user) {
			throw new NotFoundException('Utilisateur introuvable !')
		}

		return await this.repo.remove(user)
	}
}
