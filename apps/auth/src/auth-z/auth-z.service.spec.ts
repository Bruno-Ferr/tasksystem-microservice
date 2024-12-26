import { Test, TestingModule } from '@nestjs/testing';
import { AuthZService } from './auth-z.service';

describe('AuthZService', () => {
  let service: AuthZService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthZService],
    }).compile();

    service = module.get<AuthZService>(AuthZService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
