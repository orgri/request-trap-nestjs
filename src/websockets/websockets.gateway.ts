import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Requests } from '../requests/requests.entity';

@WebSocketGateway()
export class WebsocketsGateway {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    client.on('join', (room: string) =>
      this.handleSubscribeEvent(client, room),
    );
  }

  @SubscribeMessage('events')
  findAll(): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('new')
  async newData(@MessageBody() data: Requests): Promise<Requests> {
    return data;
  }

  async handleSubscribeEvent(client: Socket, room: string) {
    client.join(room);
  }

  async publishEventToRoom(room: string, event: string, data: any) {
    this.server.to(room).emit(event, data);
  }
}
