import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { makeApp } from '#/app';

describe('dev API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await makeApp({ isTest: true });
  });

  it('/dev (GET)', () => {
    return request(app.getHttpServer())
      .get('/dev')
      .expect(200)
      .expect({ message: 'Hello World!' });
  });
});
