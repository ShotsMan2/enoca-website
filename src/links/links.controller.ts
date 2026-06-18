import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
    constructor(private readonly linksService: LinksService) { }

    @Post() // Admin panelinden bir kategoriye alt link ekleme ucu
    create(@Body() createLinkDto: CreateLinkDto) {
        return this.linksService.create(createLinkDto);
    }

    @Delete(':id') // Link silme ucu
    remove(@Param('id') id: string) {
        return this.linksService.remove(+id);
    }
}