import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservsEntity } from './Reservs.entity';
import { Gender } from '../enum-types/enum.type';

@Index('organizators_pkey', ['id'], { unique: true })
@Entity('organizators', { schema: 'public' })
export class OrganizerEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'surname' })
  surname: string;

  @Column('enum', { name: 'gender', enum: Gender, default: Gender.Male })
  gender: Gender;

  @Column('text', { name: 'password' })
  password: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'phone' })
  phone: string;

  @Column('numeric', { name: 'balance', default: 0 })
  balance: number;

  @Column('text', { name: 'photo', nullable: true })
  photo: string | null;

  @Column('date', { name: 'born_date' })
  bornDate: string;

  @Column('timestamptz', {
    name: 'reg_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: string;

  @OneToMany(() => ReservsEntity, (reservs) => reservs.org)
  reservs: ReservsEntity[];
}
