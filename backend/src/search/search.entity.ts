import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Search {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@CreateDateColumn()
	createdAt: string
}