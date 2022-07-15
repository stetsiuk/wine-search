import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category) private categoryRepository: Repository<Category>
	) {}

	public async getCategory(categoryName: string): Promise<Category> {
		try {
			return await this.categoryRepository.findOne({where: {name: categoryName}});
		} catch (e) {

		}
	}

	public async createCategory (categoryName: string): Promise<Category> {
		try {
			const category = await this.getCategory(categoryName);

			if (!category) {
				const createdCategory = await this.categoryRepository.create({name: categoryName});
				return await this.categoryRepository.save(createdCategory);
			}

			return category;

		} catch (e) {

		}
	}

	public async createAndGetCategoriesFromApi (categoriesFromApi: string | string[]) {
		try {
			if (categoriesFromApi === '') {
				return null;
			}

			if (Array.isArray(categoriesFromApi)) {
				const createdCategories: Category[] = [];

				for (let category of categoriesFromApi) {
					const newCategory = await this.createCategory(category);
					createdCategories.push(newCategory);
				}
				return createdCategories

			}

			return [await this.createCategory(categoriesFromApi)];

		} catch (e) {

		}
	}
}