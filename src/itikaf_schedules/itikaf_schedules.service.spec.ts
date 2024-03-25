import { Test, TestingModule } from '@nestjs/testing';
import { ItikafSchedulesService } from './itikaf_schedules.service';

describe('ItikafSchedulesService', () => {
  let service: ItikafSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItikafSchedulesService],
    }).compile();

    service = module.get<ItikafSchedulesService>(ItikafSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
