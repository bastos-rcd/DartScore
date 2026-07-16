import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { UserService } from '@/users/user.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: {
		email: string
		password: string
	}): Promise<{ token: string }> {
		const user = await this.userService.findByEmail(dto.email)

		if (!user) throw new UnauthorizedException('Identifiants invalides !')

		if (!user.active) throw new UnauthorizedException('Droits insuffisants !')

		const valid = await bcrypt.compare(dto.password, user.password)

		if (!valid) throw new UnauthorizedException('Identifiants invalides !')

		const payload = { sub: user.id, email: user.email, role: user.role }

		return { token: this.jwtService.sign(payload) }
	}
}
