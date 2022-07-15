import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partner {
	@PrimaryGeneratedColumn()
	id: number

	@Column({unique: true})
	name: string

	@Column()
	priority: number
}