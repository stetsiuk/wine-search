import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sort {
	@PrimaryGeneratedColumn()
	id: number

	@Column({unique: true})
	name: string
}