import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformsEntity } from './Platforms.entity';
import { ReservsEntity } from './Reservs.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('owners_pkey', ['id'], { unique: true })
@Entity('owners', { schema: 'public' })
export class OwnersEntity {
  @ApiProperty({ example: '1', description: 'Уникальный id' })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty()
  @Column('text', { name: 'surname' })
  surname: string;

  @ApiProperty()
  @Column('text', { name: 'patronymic' })
  patronymic: string;

  @ApiProperty()
  @Column('text', { name: 'gender' })
  gender: string;

  @ApiProperty()
  @Column('text', { name: 'password' })
  password: string;

  @ApiProperty()
  @Column('timestamptz', {
    name: 'reg_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: string;

  @ApiProperty()
  @Column('text', { name: 'email' })
  email: string;

  @ApiProperty()
  @Column('text', { name: 'phone' })
  phone: string;

  @ApiProperty()
  @Column('text', { name: 'organization', nullable: true })
  organization: string | null;

  @ApiProperty()
  @Column('text', { name: 'passport', nullable: true })
  passport: string | null;

  @ApiProperty()
  @Column('text', { name: 'inn', nullable: true })
  inn: string | null;

  @ApiProperty()
  @Column('numeric', { name: 'balance', default: 0 })
  balance: number;

  @ApiProperty()
  @Column('text', { name: 'photo', nullable: true })
  photo: string | null;

  @ApiProperty()
  @Column('date', { name: 'born_date' })
  bornDate: string;

  @OneToMany(() => PlatformsEntity, (platforms) => platforms.owner)
  platforms: PlatformsEntity[];

  @OneToMany(() => ReservsEntity, (reservs) => reservs.owner)
  reservs: ReservsEntity[];
}
