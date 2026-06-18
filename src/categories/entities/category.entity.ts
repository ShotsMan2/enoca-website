import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Link } from '../../links/entities/link.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string; // URL dostu isim (örn: 'yazilim-cozumleri')

  @Column({ default: 0 })
  order: number; // Menüdeki sıralama önceliği

  @OneToMany(() => Link, (link) => link.category, { cascade: true })
  links: Link[];
}