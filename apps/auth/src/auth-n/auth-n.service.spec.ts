import { Test, TestingModule } from '@nestjs/testing';
import { AuthNService } from './auth-n.service';

describe('AuthNService', () => {
  let service: AuthNService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthNService],
    }).compile();

    service = module.get<AuthNService>(AuthNService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
