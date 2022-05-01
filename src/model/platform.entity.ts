import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Owner } from './owner.entity';
@Entity()
export class Platform {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric' })
  price: string;

  @Column({ type: 'text' })
  graphic: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  conditions: string;

  @Column({ type: 'integer' })
  phone: string;

  @Column({ type: 'text' })
  rules: string;

  @Column({ type: 'numeric' })
  area: string;

  @Column({ type: 'text' })
  main_img: string;

  @Column({ type: 'text', array: true })
  photos: string[];

  @Column({ type: 'numeric' })
  capacity: string;

  @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
  reg_date: string;

  @Column({ type: 'date' })
  born_date: string;

  @ManyToOne((type) => Owner, {
    cascade: ['insert', 'update'],
  })
  owner: Owner;
}
