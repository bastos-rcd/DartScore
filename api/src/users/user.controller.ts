import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { User } from '@/users/user.entity'
import { UserService } from '@/users/user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll()
	}

	@Get(':id')
	async findById(@Param('id') id: number): Promise<User> {
		return this.userService.findById(id)
	}

	@Post()
	async create(@Body() dto: Partial<User>): Promise<User> {
		return this.userService.create(dto)
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() dto: Partial<User>,
	): Promise<User> {
		return this.userService.update(id, dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: number): Promise<User> {
		return this.userService.delete(id)
	}
}
