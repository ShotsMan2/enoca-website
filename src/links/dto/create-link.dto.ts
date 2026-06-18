import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateLinkDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsInt()
    @IsNotEmpty()
    categoryId: number; // Hangi kategoriye bağlanacağını belirtiyoruz
}