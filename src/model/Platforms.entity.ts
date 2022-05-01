import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlatformFacilitiesEntity } from './PlatformFacilities.entity';
import { OwnersEntity } from './Owners.entity';
import { ReservsEntity } from './Reservs.entity';

@Index('platforms_pkey', ['id'], { unique: true })
@Entity('platforms', { schema: 'public' })
export class PlatformsEntity {
  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'graphic' })
  graphic: string;

  @Column('text', { name: 'address' })
  address: string;

  @Column('text', { name: 'conditions' })
  conditions: string;

  @Column('text', { name: 'phone' })
  phone: string;

  @Column('timestamp with time zone', { name: 'reg_date' })
  regDate: Date;

  @Column('text', { name: 'rules' })
  rules: string;

  @Column('numeric', { name: 'area' })
  area: string;

  @Column('text', { name: 'main_img', nullable: true })
  mainImg: string | null;

  @Column('text', { name: 'photos', nullable: true, array: true })
  photos: string[] | null;

  @Column('numeric', { name: 'capacity' })
  capacity: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('numeric', { name: 'price' })
  price: string;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @OneToMany(
    () => PlatformFacilitiesEntity,
    (platformFacilities) => platformFacilities.platform,
  )
  platformFacilities: PlatformFacilitiesEntity[];

  @ManyToOne(() => OwnersEntity, (owners) => owners.platforms, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: OwnersEntity;

  @OneToMany(() => ReservsEntity, (reservs) => reservs.platform)
  reservs: ReservsEntity[];
}