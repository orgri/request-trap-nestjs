import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Requests } from './requests.entity';
import { WebsocketsGateway } from '../websockets/websockets.gateway';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private requestsRepository: Repository<Requests>,
    private websockets: WebsocketsGateway,
  ) {}

  async findAll(id: string): Promise<Requests[]> {
    const LIMIT = 50;
    return await this.requestsRepository.find({
      where: { id },
      order: { createdAt: 'DESC' },
      take: LIMIT,
    });
  }

  async createOne(id: string, req: Request): Promise<Requests> {
    const request = await this.requestsRepository.save(
      new Requests({
        id: req.params.id,
        ip: req.ip,
        method: req.method,
        scheme: req.protocol,
        query: req.query,
        params: req.params,
        body: req.body,
        cookies: req.cookies,
        headers: req.headers,
      }),
    );
    this.websockets.publishEventToRoom(id, 'new', request);
    return request;
  }
}
