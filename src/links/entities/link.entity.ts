import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string; // Yönlendirilecek adres

  // Bir kategori silindiğinde altındaki linkler de otomatik silinsin (CASCADE)
  @ManyToOne(() => Category, (category) => category.links, { onDelete: 'CASCADE' })
  category: Category;
}