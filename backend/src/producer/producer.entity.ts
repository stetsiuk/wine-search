import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producer {
	@PrimaryGeneratedColumn()
	id: number

	@Index()
	@Column()
	name: string
}