import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Message } from '@/messages/message.entity'

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		private readonly repo: Repository<Message>,
	) {}

	async findAll(): Promise<Message[]> {
		return this.repo.find()
	}

	async findById(id: number): Promise<Message> {
		const message = await this.repo.findOne({
			where: { id },
		})

		if (!message) throw new NotFoundException('Message introuvable !')

		return message
	}

	async create(dto: Partial<Message>): Promise<Message> {
		if (!dto.type || !dto.event || !dto.text)
			throw new BadRequestException('Données requises manquantes !')

		const create = this.repo.create(dto)

		return await this.repo.save(create)
	}

	async update(id: number, dto: Partial<Message>): Promise<Message> {
		const message = await this.repo.findOne({
			where: { id },
		})

		if (!message) throw new NotFoundException('Message introuvable !')

		return await this.repo.save({ ...message, ...dto })
	}

	async delete(id: number): Promise<Message> {
		const message = await this.repo.findOne({
			where: { id },
		})

		if (!message) throw new NotFoundException('Message introuvable !')

		return await this.repo.remove(message)
	}

	async random(event: string, type: string): Promise<Message | null> {
		const messages = await this.repo.find({
			where: { event, type },
		})

		if (messages.length === 0) return null

		const random = Math.floor(Math.random() * messages.length)

		return messages[random]
	}
}
