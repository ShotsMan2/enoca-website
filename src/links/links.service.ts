import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
    constructor(
        @InjectRepository(Link)
        private linkRepository: Repository<Link>,
    ) { }

    async create(createLinkDto: CreateLinkDto): Promise<Link> {
        // categoryId üzerinden ilişkiyi kurarak kaydediyoruz
        const link = this.linkRepository.create({
            title: createLinkDto.title,
            url: createLinkDto.url,
            category: { id: createLinkDto.categoryId }
        });
        return this.linkRepository.save(link);
    }

    async remove(id: number): Promise<void> {
        await this.linkRepository.delete(id);
    }
}