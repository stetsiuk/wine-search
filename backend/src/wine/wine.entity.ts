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
import { Merchant } from '../merchant/merchant.entity';
import { WineCountries } from './wine.interface';


@Entity()
export class Wine {
	@PrimaryGeneratedColumn()
	id: number

	@Index()
	@Column({name: 'article_number'})
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
	@JoinTable({
		name: 'wine_categories',
		joinColumn: {name: 'wine_id', referencedColumnName: 'id'},
		inverseJoinColumn: {name: 'category_id', referencedColumnName: 'id'}
	})
	categories: Category[]

	@ManyToMany(() => Sort, {eager: true, nullable: true})
	@JoinTable({
		name: 'wine_sorts',
		joinColumn: {name: 'wine_id', referencedColumnName: 'id'},
		inverseJoinColumn: {name: 'sort_id', referencedColumnName: 'id'}}
	)
	sorts: Sort[]

	@ManyToOne(() => Producer, {eager: true, nullable: true})
	@JoinColumn({name: 'producer_id'})
	producer: Producer

	@ManyToOne(() => Merchant, {eager: true})
	@JoinColumn({name: 'merchant_id'})
	merchant: Merchant

	@ManyToOne(() => Partner, {eager: true})
	@JoinColumn({name: 'partner_id'})
	partner: Partner

	@Column({name: 'link', nullable: true})
	link: string

	@Column({name: 'image_url', nullable: true})
	imageUrl: string

	@Column({nullable: true})
	land: string

	@Column({nullable: true})
	region: string

	@Column({length: 2})
	country: WineCountries

	@Column({nullable: true})
	ean: string

	@CreateDateColumn({name: 'created_at'})
	createdAt: string
}