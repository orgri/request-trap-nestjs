import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): any {
    return { header: 'Index page' };
  }
}
