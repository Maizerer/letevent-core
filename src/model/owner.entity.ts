import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  surname: string;

  @Column({ type: 'text' })
  patronymic: string;

  @Column({ type: 'text' })
  passport: string;

  @Column({ type: 'integer' })
  inn: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'numeric' })
  balance: string;

  @Column({ type: 'text' })
  photo: string;

  @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
  reg_date: string;

  @Column({ type: 'date' })
  born_date: string;
}
