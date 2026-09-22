import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('message')
export class Message {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 10, default: 'X01', enum: ['X01', 'KILLER'] })
	type: string

	@Column({
		length: 10,
		default: 'turn',
		enum: ['low', 'high', 'turn', 'bust', 'finish', 'hit', 'attack', 'die'],
	})
	event: string

	@Column({ length: 255 })
	text: string
}
