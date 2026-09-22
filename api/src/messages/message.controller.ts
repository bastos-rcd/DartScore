import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Roles } from '@/auth/roles.decorator'

import { Message } from '@/messages/message.entity'
import { MessageService } from '@/messages/message.service'

@Controller('messages')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Roles('ADMIN')
	@Get()
	async findAll(): Promise<Message[]> {
		return this.messageService.findAll()
	}

	@Roles('ADMIN')
	@Get(':id')
	async findById(@Param('id') id: number): Promise<Message> {
		return this.messageService.findById(id)
	}

	@Roles('ADMIN')
	@Post()
	async create(@Body() dto: Partial<Message>): Promise<Message> {
		return this.messageService.create(dto)
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() dto: Partial<Message>,
	): Promise<Message> {
		return this.messageService.update(id, dto)
	}

	@Roles('ADMIN')
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<Message> {
		return this.messageService.delete(id)
	}

	@Roles('USER')
	@Post('random')
	async random(
		@Body() dto: { event: string; type: string },
	): Promise<Message | null> {
		return this.messageService.random(dto.event, dto.type)
	}
}
