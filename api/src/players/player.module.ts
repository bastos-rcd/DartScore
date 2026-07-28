import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Player } from '@/players/player.entity'
import { PlayerController } from '@/players/player.controller'
import { PlayerService } from '@/players/player.service'

@Module({
	imports: [TypeOrmModule.forFeature([Player])],
	controllers: [PlayerController],
	providers: [PlayerService],
	exports: [PlayerService],
})
export class PlayerModule {}
