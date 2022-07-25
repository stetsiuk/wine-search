import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { WineCountries } from '../wine/wine.interface';

@Entity()
export class Search {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({length: 2})
	country: WineCountries

	@CreateDateColumn()
	createdAt: string
}