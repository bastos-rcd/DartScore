import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PlayerModule } from '@/players/player.module'

import { Game } from '@/games/game.entity'
import { GameController } from '@/games/game.controller'
import { GameService } from '@/games/game.service'

@Module({
	imports: [TypeOrmModule.forFeature([Game]), PlayerModule],
	controllers: [GameController],
	providers: [GameService],
	exports: [GameService],
})
export class GameModule {}
