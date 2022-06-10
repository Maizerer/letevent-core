import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FacilityModule } from '../src/controller/facility/facility.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FacilityEntity } from '../src/model/Facility.entity';
import * as fs from 'fs';
import * as path from 'path';

describe('FacilityController (e2e)', () => {
  let app: INestApplication;
  const mockFacilities = [
    {
      id: 3,
      src: '/uploads/rec-img-mob7957.png',
      name: 'hello2222',
    },
    {
      id: 4,
      src: '/uploads/rec-img-mob1344.png',
      name: 'hello2222',
    },
  ];
  const mockFacilityRepository = {
    find: jest.fn().mockResolvedValue(mockFacilities),
    findOneOrFail: jest.fn().mockResolvedValue(mockFacilities),
    remove: jest.fn().mockResolvedValue(mockFacilities),
    save: jest.fn().mockImplementation((facility) => {
      return { id: Date.now(), ...facility };
    }),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FacilityModule],
    })
      .overrideProvider(getRepositoryToken(FacilityEntity))
      .useValue(mockFacilityRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/facility/get-all (GET)', () => {
    return request(app.getHttpServer())
      .get('/facility/get-all')
      .expect(200, mockFacilities)
      .expect('Content-Type', /json/);
  });

  it('/api/facility/create (POST)', () => {
    fs.exists(path.join(__dirname, 'mock/image.jpg'), (exists) => {
      if (!exists) throw new Error('file does not exist');
    });
    return request(app.getHttpServer())
      .post('/facility/create')
      .attach('file', path.join(__dirname, 'mock/image.jpg'))
      .field('name', 'Фуршет')
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: 'Фуршет',
          src: expect.any(String),
        });
      });
  });

  it('/api/facility/{id} (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/facility/5')
      .expect(200, { message: 'Удобство успешно удалено' })
      .expect('Content-Type', /json/);
  });
});
