import { Player } from '@/players/player.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

export interface Classment {
	player: Player
	score: number
	podium: number
	played: number
}

export interface Rank {
	player: number
	score: number
}

@Entity('game')
export class Game {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 10, default: '301', enum: ['201', '301', '501', 'killer'] })
	type: string

	@CreateDateColumn({ type: 'timestamptz' })
	date: Date

	@Column({ type: 'jsonb', default: [] })
	rank: Rank[]

	@Column({ name: 'user_id' })
	userId: number
}
