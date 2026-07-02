import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('player')
export class Player {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 100, unique: true })
	name: string

	@Column({ name: 'user_id' })
	userId: number
}
