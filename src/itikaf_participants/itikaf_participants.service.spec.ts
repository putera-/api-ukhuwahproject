import { Test, TestingModule } from '@nestjs/testing';
import { ItikafParticipantsService } from './itikaf_participants.service';

describe('ItikafParticipantsService', () => {
  let service: ItikafParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItikafParticipantsService],
    }).compile();

    service = module.get<ItikafParticipantsService>(ItikafParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
