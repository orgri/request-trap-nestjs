import { Global, Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';

@Global()
@Module({
  providers: [WebsocketsGateway],
})
export class WebsocketsModule {}
