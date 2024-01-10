import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { makeTestingApp } from '#test/lib/test.run';

describe('dev API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await makeTestingApp({ listen: false });
  });

  it('/dev (GET)', () => {
    return request(app.getHttpServer())
      .get('/dev')
      .expect(200)
      .expect({ message: 'Hello World!' });
  });
});
