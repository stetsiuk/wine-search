import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Wine } from '../wine/wine.entity';
import { Request } from '../request/request.entity';

@Entity()
export class Visit {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => Wine)
	@JoinColumn()
	wine_id: Wine

	@OneToOne(() => Request)
	@JoinColumn()
	request_id: Request

	@CreateDateColumn()
	created: string
}