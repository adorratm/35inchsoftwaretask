/**
 * @file: auth.service.spec.ts
 * @description: This file is responsible for the testing of the auth service layer of the auth module.
 * @author: Emre KILIÇ - (https://github.com/adorratm)
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
