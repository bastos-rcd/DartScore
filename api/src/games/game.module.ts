import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Game } from '@/games/game.entity'
import { GameController } from '@/games/game.controller'
import { GameService } from '@/games/game.service'

@Module({
	imports: [TypeOrmModule.forFeature([Game])],
	controllers: [GameController],
	providers: [GameService],
	exports: [GameService],
})
export class GameModule {}
