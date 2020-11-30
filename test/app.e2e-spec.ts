import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as ejs from 'ejs';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, '../src', 'public'));
    app.setBaseViewsDir(join(__dirname, '../src', 'views'));
    app.setViewEngine('ejs');
    await app.init();
  });

  it('/ (GET)', async () => {
    const response = await ejs.renderFile(
      join(__dirname, '../src', 'views/index.ejs'),
      { header: 'Index page' },
    );

    return request(app.getHttpServer()).get('/').expect(200).expect(response);
  });

  afterAll(async () => {
    await app.close();
  });
});
