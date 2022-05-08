import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrganizerEntity } from '../../model/Organizer.entity';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizerService {
  constructor(
    @InjectRepository(OrganizerEntity)
    private readonly repo: Repository<OrganizerEntity>,
  ) {}

  async createOrganizer(dto: CreateOrganizerDto): Promise<OrganizerEntity> {
    return await this.repo.save(dto);
  }
  async getOrganizerByEmail(email: string) {
    return await this.repo.findOne({ email: email });
  }
}
