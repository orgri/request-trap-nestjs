import {
  All,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Render,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Requests } from './requests.entity';
import { RequestsService } from './requests.service';

@Controller('')
export class RequestsController {
  constructor(public readonly service: RequestsService) {}

  @Get(':id/requests')
  @Render('requests')
  async getRequests(@Param('id') id): Promise<any> {
    const data = await this.service.findAll(id);
    return { data, id };
  }

  // @All(':id/requests')
  // async raiseError(@Req() req: Request): Promise<any> {
  //   return new HttpException(
  //     {
  //       message: `Cannot ${req.method} ${req.originalUrl}`,
  //       error: 'Not Found',
  //       statusCode: HttpStatus.NOT_FOUND,
  //     },
  //     HttpStatus.NOT_FOUND,
  //   ).getResponse();
  // }

  @All(':id')
  @HttpCode(201)
  async createOne(@Param('id') id, @Req() req: Request): Promise<Requests> {
    if (req.path === '/') {
      return await this.service.createOne(id, req);
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `Cannot ${req.method} ${req.originalUrl}`,
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
