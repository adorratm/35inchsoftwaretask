/**
 * @file: auth.controller.spec.ts
 * @description: This file is responsible for the testing of the auth controller layer of the auth module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
