import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { Requests } from './requests.entity';
import { WebsocketsGateway } from '../websockets/websockets.gateway';

describe('RequestsController', () => {
  let controller: RequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url: process.env.MONGODB_URL,
          database: process.env.MONGODB_DATABASE_TEST,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }),
        TypeOrmModule.forFeature([Requests]),
      ],
      controllers: [RequestsController],
      providers: [RequestsService, WebsocketsGateway],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
