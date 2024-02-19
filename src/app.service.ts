/**
 * @file: app.service.ts
 * @description: This file is responsible for the service layer of the app module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Get the hello message
  getHello(): string {
    return 'Hello World!';
  }
}
