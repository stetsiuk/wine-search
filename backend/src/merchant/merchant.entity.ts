import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Merchant {
	@PrimaryGeneratedColumn()
	id: number

	@Index()
	@Column({unique: true})
	name: string
}