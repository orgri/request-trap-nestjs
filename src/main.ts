import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../src', 'public'));
  app.setBaseViewsDir(join(__dirname, '../src', 'views'));
  app.setViewEngine('ejs');
  app.use(compression());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': [
          "'self'",
          "'unsafe-eval'",
          'https://code.jquery.com',
          'https://cdn.jsdelivr.net',
          'https://stackpath.bootstrapcdn.com',
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          'https://stackpath.bootstrapcdn.com',
        ],
      },
    }),
  );

  await app.listen(PORT);
}
bootstrap();
