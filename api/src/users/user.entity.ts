import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 100 })
	name: string

	@Column({ length: 100, unique: true })
	email: string

	@Column({ length: 255, select: false })
	password: string

	@Column({ length: 5, default: 'USER', enum: ['USER', 'ADMIN'] })
	role: string

	@Column({ default: true })
	active: boolean
}
