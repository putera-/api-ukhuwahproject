import { Test, TestingModule } from '@nestjs/testing';
import { ItikafParticipantsController } from './itikaf_participants.controller';
import { ItikafParticipantsService } from './itikaf_participants.service';

describe('ItikafParticipantsController', () => {
  let controller: ItikafParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItikafParticipantsController],
      providers: [ItikafParticipantsService],
    }).compile();

    controller = module.get<ItikafParticipantsController>(ItikafParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
