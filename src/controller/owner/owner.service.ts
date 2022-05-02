import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from '../../model/Owners.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly repo: Repository<OwnerEntity>,
  ) {}
  async createOwner(ownerDto: CreateOwnerDto): Promise<OwnerEntity> {
    return await this.repo.save(ownerDto);
  }

  async getOwnerByEmail(email: string) {
    return await this.repo.findOne({ email: email });
  }
}
