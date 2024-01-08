import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { makeTestingApp } from './lib/test.run';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await makeTestingApp({ listen: false });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
