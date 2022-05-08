import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizerEntity } from './Organizer.entity';
import { OwnerEntity } from './Owner.entity';
import { PlatformEntity } from './Platform.entity';

@Index('reservs_pkey', ['id'], { unique: true })
@Index('fki_org_id', ['orgId'], {})
@Index('fki_reservs_owners', ['ownerId'], {})
@Index('fki_owners', ['platformId'], {})
@Entity('reservs', { schema: 'public' })
export class ReservsEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'org_id' })
  orgId: number;

  @Column('integer', { name: 'platform_id' })
  platformId: number;

  @Column('integer', { name: 'owner_id' })
  ownerId: number;

  @Column('text', { name: 'reserve_time' })
  reserveTime: string;

  @Column('integer', { name: 'hours_count' })
  hoursCount: number;

  @Column('numeric', { name: 'total_price' })
  totalPrice: string;

  @Column('timestamp with time zone', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('timestamp with time zone', { name: 'reserve_date', nullable: true })
  reserveDate: Date | null;

  @ManyToOne(() => OrganizerEntity, (organizators) => organizators.reservs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
  org: OrganizerEntity;

  @ManyToOne(() => OwnerEntity, (owners) => owners.reservs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: OwnerEntity;

  @ManyToOne(() => PlatformEntity, (platforms) => platforms.reservs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'platform_id', referencedColumnName: 'id' }])
  platform: PlatformEntity;
}
