import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformEntity } from './Platform.entity';
import { ReservsEntity } from './Reservs.entity';
import { Gender } from '../enum-types/enum.type';

@Index('owners_pkey', ['id'], { unique: true })
@Entity('owners', { schema: 'public' })
export class OwnerEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'surname' })
  surname: string;

  @Column('text', { name: 'patronymic' })
  patronymic: string;

  @Column('enum', { name: 'gender', enum: Gender, default: Gender.Male })
  gender: Gender;

  @Column('text', { name: 'password' })
  password: string;

  @Column('timestamptz', {
    name: 'reg_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'phone' })
  phone: string;

  @Column('text', { name: 'organization', nullable: true })
  organization: string | null;

  @Column('text', { name: 'passport', nullable: true })
  passport: string | null;

  @Column('text', { name: 'inn', nullable: true })
  inn: string | null;

  @Column('numeric', { name: 'balance', default: 0 })
  balance: number;

  @Column('text', { name: 'photo', nullable: true })
  photo: string | null;

  @Column('date', { name: 'born_date' })
  bornDate: string;

  @OneToMany(() => PlatformEntity, (platforms) => platforms.owner)
  platforms: PlatformEntity[];

  @OneToMany(() => ReservsEntity, (reservs) => reservs.owner)
  reservs: ReservsEntity[];
}
