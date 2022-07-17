import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToMany,
	JoinTable, Index
} from 'typeorm';

import { Partner } from '../partner/partner.entity';
import { Category } from '../category/category.entity';
import { Sort } from '../sort/sort.entity';
import { Producer } from '../producer/producer.entity';


@Entity()
export class Wine {
	@PrimaryGeneratedColumn()
	id: number

	@Index()
	@Column({name: 'article_number', unique: true})
	articleNumber: string

	@Index()
	@Column()
	name: string

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
	@JoinTable()
	categories: Category[]

	@ManyToMany(() => Sort, {eager: true, nullable: true})
	@JoinTable()
	sorts: Sort[]

	@ManyToOne(() => Producer, (producer) => producer.name, {eager: true, nullable: true})
	@JoinColumn({name: 'producer'})
	producer: Producer

	@Column({name: 'partner_id', nullable: true})
	partnerId: number

	@ManyToOne(() => Partner)
	@JoinColumn({name: 'partner_id'})
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

	@CreateDateColumn({name: 'created_at'})
	createdAt: string
}