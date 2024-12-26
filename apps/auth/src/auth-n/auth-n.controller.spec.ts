import { Test, TestingModule } from '@nestjs/testing';
import { AuthNController } from './auth-n.controller';

describe('AuthNController', () => {
  let controller: AuthNController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthNController],
    }).compile();

    controller = module.get<AuthNController>(AuthNController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
