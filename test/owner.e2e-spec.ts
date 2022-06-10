import { Test, TestingModule } from '@nestjs/testing';
import {
  ExecutionContext,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { OwnerModule } from '../src/controller/owner/owner.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnerEntity } from '../src/model/Owner.entity';
import * as request from 'supertest';
import { OrganizerEntity } from '../src/model/Organizer.entity';
import {
  handleError,
  JwtAuthGuard,
} from '../src/controller/auth/jwt-auth.guard';
import { TEST_TOKEN } from './mock/constants';

describe('OwnerController (e2e)', () => {
  let app: INestApplication;
  const mockOwners = [
    {
      id: 12,
      name: 'Рустем',
      surname: 'Галимов',
      patronymic: 'Рамилевич',
      gender: 'male',
      regDate: '2022-05-02T20:36:59.608Z',
      email: 'galim691@mail.ru',
      phone: '79050337285',
      organization: 'ООО Вербвеб',
      passport: '9217654789',
      inn: '4444422222',
      balance: '0',
      photo: null,
      bornDate: '2003-09-08',
    },
  ];
  const mockOwnerRepository = {
    find: jest.fn().mockResolvedValue(mockOwners),
    findOneOrFail: jest.fn().mockResolvedValue(mockOwners),
    remove: jest.fn().mockResolvedValue(mockOwners),
    save: jest.fn().mockImplementation((facility) => {
      return { id: Date.now(), ...facility };
    }),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OwnerModule],
    })
      .overrideProvider(getRepositoryToken(OwnerEntity))
      .useValue(mockOwnerRepository)
      .overrideProvider(getRepositoryToken(OrganizerEntity))
      .useValue(mockOwnerRepository)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          const authHeader = request.headers.authorization;
          const bearer = authHeader.split(' ')[0];
          const token = authHeader.split(' ')[1];

          if (bearer !== 'Bearer' || !token) {
            handleError(
              new UnauthorizedException({
                message: 'Пользователь не авторизован',
              }),
            );
          }
          request.user = { name: 'Рустем' };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/owner (GET)', async () => {
    return request(app.getHttpServer())
      .get('/owner')
      .set('Authorization', TEST_TOKEN)
      .expect(200, mockOwners)
      .expect('Content-Type', /json/);
  });
});
