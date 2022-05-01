import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformsEntity } from './Platforms.entity';
import { ReservsEntity } from './Reservs.entity';

@Index('owners_pkey', ['id'], { unique: true })
@Entity('owners', { schema: 'public' })
export class OwnersEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'surname' })
  surname: string;

  @Column('text', { name: 'patronymic' })
  patronymic: string;

  @Column('text', { name: 'gender' })
  gender: string;

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

  @OneToMany(() => PlatformsEntity, (platforms) => platforms.owner)
  platforms: PlatformsEntity[];

  @OneToMany(() => ReservsEntity, (reservs) => reservs.owner)
  reservs: ReservsEntity[];
}
