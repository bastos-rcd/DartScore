import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'

import { JwtGuard } from '@/auth/jwt.guard'
import { RolesGuard } from '@/auth/roles.guard'

import { AuthModule } from '@/auth/auth.module'

import { User } from '@/users/user.entity'
import { UserModule } from '@/users/user.module'

import { Player } from '@/players/player.entity'
import { PlayerModule } from '@/players/player.module'

import { Game } from '@/games/game.entity'
import { GameModule } from '@/games/game.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST!,
			port: +process.env.DB_PORT!,
			username: process.env.DB_USER!,
			password: process.env.DB_PASSWORD!,
			database: process.env.DB_NAME!,
			entities: [User, Player, Game],
			synchronize: false,
		}),
		AuthModule,
		UserModule,
		PlayerModule,
		GameModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
