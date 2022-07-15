import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToMany
} from 'typeorm';

import { Partner } from '../partner/partner.entity';
import { Category } from '../category/category.entity';
import { Sort } from '../sort/sort.entity';

@Entity()
export class Wine {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	producer: string

	@Column({nullable: true})
	vintage: number

	@Column({type: "float"})
	price: number

	@Column({type: "float", nullable: true})
	alcohol: number

	@Column({type: "float", nullable: true})
	volume: number

	@Column({type: "int", default: 1})
	quantity: number

	@ManyToMany(() => Category, {eager: true, nullable: true})
	categories: Category[]

	@ManyToMany(() => Sort, {eager: true, nullable: true})
	sorts: Sort[]

	@Column({nullable: true})
	partnerId: number

	@ManyToOne(() => Partner)
	@JoinColumn()
	partner: Partner

	@Column({nullable: true})
	affiliateLink: string

	@Column({nullable: true})
	imageUrl: string

	@Column({nullable: true})
	merchantId: string

	@Column({nullable: true})
	merchantUrl: string

	@Column({nullable: true})
	land: string

	@Column({nullable: true})
	region: string

	@Column({nullable: true})
	ean: string

	@CreateDateColumn()
	createdAt: string
}