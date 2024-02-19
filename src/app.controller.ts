/**
 * @file: app.controller.ts
 * @description: This file is responsible for the controller layer of the app module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Inject the app service
  constructor(private readonly appService: AppService) { }

  // Get the hello message
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
