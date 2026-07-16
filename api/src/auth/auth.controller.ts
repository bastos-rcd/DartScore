import {
	Body,
	Controller,
	Get,
	Post,
	UnauthorizedException,
} from '@nestjs/common'

import { Public } from '@/auth/public.decorator'
import { CurrentUser } from '@/auth/current.decorator'

import { AuthService } from '@/auth/auth.service'

import { User } from '@/users/user.entity'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('login')
	async login(
		@Body() dto: { email: string; password: string },
	): Promise<{ token: string }> {
		return this.authService.login(dto)
	}

	@Get('me')
	async me(@CurrentUser() user: User) {
		if (!user.active) {
			throw new UnauthorizedException('Droits insuffisants !')
		}
		return user
	}
}
