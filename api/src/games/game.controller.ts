import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { Roles } from '@/auth/roles.decorator'
import { CurrentUser } from '@/auth/current.decorator'

import { User } from '@/users/user.entity'

import { Classment, Game } from '@/games/game.entity'
import { GameService } from '@/games/game.service'

@Controller('games')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Roles('USER')
	@Get('rank')
	async rank(@CurrentUser() user: User): Promise<Classment[]> {
		return this.gameService.rank(user)
	}

	@Roles('USER')
	@Get()
	async findAll(@CurrentUser() user: User): Promise<Game[]> {
		return this.gameService.findAll(user)
	}

	@Roles('USER')
	@Get(':id')
	async findById(
		@CurrentUser() user: User,
		@Param('id') id: number,
	): Promise<Game> {
		return this.gameService.findById(user, id)
	}

	@Roles('USER')
	@Post()
	async create(
		@CurrentUser() user: User,
		@Body() dto: Partial<Game>,
	): Promise<Game> {
		return this.gameService.create(user, dto)
	}

	@Roles('USER')
	@Delete(':id')
	async delete(
		@CurrentUser() user: User,
		@Param('id') id: number,
	): Promise<Game> {
		return this.gameService.delete(user, id)
	}
}
