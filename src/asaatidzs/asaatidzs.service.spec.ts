import { Test, TestingModule } from '@nestjs/testing';
import { AsaatidzsService } from './asaatidzs.service';

describe('AsaatidzsService', () => {
  let service: AsaatidzsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsaatidzsService],
    }).compile();

    service = module.get<AsaatidzsService>(AsaatidzsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
