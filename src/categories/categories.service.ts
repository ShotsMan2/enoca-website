import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    // Tüm kategorileri alt linkleriyle birlikte çeker (Frontend Menü için anahtar fonksiyon)
    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find({
            relations: { links: true },
            order: { order: 'ASC' },
        });
    }

    async remove(id: number): Promise<void> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`ID'si ${id} olan kategori bulunamadı.`);
        }
    }
}