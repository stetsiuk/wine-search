import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Wine } from '../wine/wine.entity';
import { Search } from '../search/search.entity';

@Entity()
export class Visit {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => Wine)
	@JoinColumn({name: 'wine_id'})
	wineId: Wine

	@OneToOne(() => Search)
	@JoinColumn({name: 'search_id'})
	searchId: Search

	@CreateDateColumn()
	created: string
}