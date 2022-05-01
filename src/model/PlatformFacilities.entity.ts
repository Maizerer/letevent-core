import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FacilitiesEntity } from './Facilities.entity';
import { PlatformsEntity } from './Platforms.entity';

@Index('fki_1', ['facilityId'], {})
@Index('platform_facilities_pkey', ['id'], { unique: true })
@Index('fki_d', ['platformId'], {})
@Entity('platform_facilities', { schema: 'public' })
export class PlatformFacilitiesEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'platform_id' })
  platformId: number;

  @Column('integer', { name: 'facility_id' })
  facilityId: number;

  @Column('numeric', { name: 'price', nullable: true, default: () => '0' })
  price: string | null;

  @ManyToOne(
    () => FacilitiesEntity,
    (facilities) => facilities.platformFacilities,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'facility_id', referencedColumnName: 'id' }])
  facility: FacilitiesEntity;

  @ManyToOne(
    () => PlatformsEntity,
    (platforms) => platforms.platformFacilities,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'platform_id', referencedColumnName: 'id' }])
  platform: PlatformsEntity;
}
