import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FacilityEntity } from './Facility.entity';
import { PlatformEntity } from './Platform.entity';

@Index('fki_1', ['facilityId'], {})
@Index('platform_facilities_pkey', ['id'], { unique: true })
@Index('fki_d', ['platformId'], {})
@Entity('platform_facilities', { schema: 'public' })
export class PlatformFacilityEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'platform_id' })
  platformId: number;

  @Column('integer', { name: 'facility_id' })
  facilityId: number;

  @Column('numeric', { name: 'price', nullable: true, default: () => '0' })
  price: string | null;

  @ManyToOne(
    () => FacilityEntity,
    (facilities) => facilities.platformFacilities,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'facility_id', referencedColumnName: 'id' }])
  facility: FacilityEntity;

  @ManyToOne(
    () => PlatformEntity,
    (platforms) => platforms.platformFacilities,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'platform_id', referencedColumnName: 'id' }])
  platform: PlatformEntity;
}
