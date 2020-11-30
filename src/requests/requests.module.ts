import { RequestsService } from './requests.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { Requests } from './requests.entity';
import { WebsocketsGateway } from '../websockets/websockets.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Requests])],
  controllers: [RequestsController],
  providers: [RequestsService, WebsocketsGateway],
})
export class RequestsModule {}
