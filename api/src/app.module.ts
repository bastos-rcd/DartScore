import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@/users/user.entity'
import { UserService } from '@/users/user.service'
import { UserController } from '@/users/user.controller'

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
			entities: [User],
			synchronize: false,
		}),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class AppModule {}
