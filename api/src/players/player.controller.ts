import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { User } from '@/users/user.entity'

import { Player } from '@/players/player.entity'
import { PlayerService } from '@/players/player.service'
import { CurrentUser } from '@/auth/current.decorator'

@Controller('players')
export class PlayerController {
	constructor(private readonly playerService: PlayerService) {}

	@Get()
	async findAll(@CurrentUser() user: User): Promise<Player[]> {
		return this.playerService.findAll(user)
	}

	@Get(':id')
	async findById(
		@CurrentUser() user: User,
		@Param('id') id: number,
	): Promise<Player> {
		return this.playerService.findById(user, id)
	}

	@Post()
	async create(
		@CurrentUser() user: User,
		@Body() dto: Partial<Player>,
	): Promise<Player> {
		return this.playerService.create(user, dto)
	}

	@Put(':id')
	async update(
		@CurrentUser() user: User,
		@Param('id') id: number,
		@Body() dto: Partial<Player>,
	): Promise<Player> {
		return this.playerService.update(user, id, dto)
	}

	@Delete(':id')
	async delete(
		@CurrentUser() user: User,
		@Param('id') id: number,
	): Promise<Player> {
		return this.playerService.delete(user, id)
	}
}
