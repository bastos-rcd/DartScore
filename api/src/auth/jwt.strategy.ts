import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserService } from '@/users/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: process.env.JWT_SECRET!,
		})
	}

	async validate(payload: { sub: number; email: string; role: string }) {
		const user = await this.userService.find(payload.sub)

		if (!user || !user.active) throw new UnauthorizedException()

		return user
	}
}
