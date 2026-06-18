import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post() // Admin panelinden yeni kategori ekleme ucu
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get() // Hem frontend navbar hem admin paneli listelemesi için
    findAll() {
        return this.categoriesService.findAll();
    }

    @Delete(':id') // Admin panelinden kategori silme ucu
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }
}