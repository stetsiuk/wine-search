import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@CreateDateColumn()
	createdAt: string
}