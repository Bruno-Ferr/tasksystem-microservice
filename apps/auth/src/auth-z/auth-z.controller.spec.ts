import { Test, TestingModule } from '@nestjs/testing';
import { AuthZController } from './auth-z.controller';

describe('AuthZController', () => {
  let controller: AuthZController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthZController],
    }).compile();

    controller = module.get<AuthZController>(AuthZController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
