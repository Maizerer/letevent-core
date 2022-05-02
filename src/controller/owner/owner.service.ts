import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersEntity } from '../../model/Owners.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnersEntity)
    private readonly repo: Repository<OwnersEntity>,
  ) {}
  async create(ownerDto: CreateOwnerDto): Promise<OwnersEntity> {
    return await this.repo.save(ownerDto);
  }
}
