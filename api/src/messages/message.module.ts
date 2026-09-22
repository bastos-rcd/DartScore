import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Message } from '@/messages/message.entity'
import { MessageService } from '@/messages/message.service'
import { MessageController } from '@/messages/message.controller'

@Module({
	imports: [TypeOrmModule.forFeature([Message])],
	controllers: [MessageController],
	providers: [MessageService],
	exports: [MessageService],
})
export class MessageModule {}
