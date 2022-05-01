import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservsEntity } from './Reservs.entity';

@Index('organizators_pkey', ['id'], { unique: true })
@Entity('organizators', { schema: 'public' })
export class OrganizatorsEntity {
  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'surname' })
  surname: string;

  @Column('text', { name: 'gender' })
  gender: string;

  @Column('text', { name: 'password' })
  password: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'phone', nullable: true })
  phone: string | null;

  @Column('numeric', { name: 'balance', nullable: true })
  balance: string | null;

  @Column('text', { name: 'photo', nullable: true })
  photo: string | null;

  @Column('text', { name: 'fingerprint', nullable: true, array: true })
  fingerprint: string[] | null;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('date', { name: 'born_date' })
  bornDate: string;

  @Column('timestamp with time zone', { name: 'reg_date', nullable: true })
  regDate: Date | null;

  @OneToMany(() => ReservsEntity, (reservs) => reservs.org)
  reservs: ReservsEntity[];
}
