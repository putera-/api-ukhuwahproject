import { Test, TestingModule } from '@nestjs/testing';
import { ItikafSchedulesController } from './itikaf_schedules.controller';
import { ItikafSchedulesService } from './itikaf_schedules.service';

describe('ItikafSchedulesController', () => {
  let controller: ItikafSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItikafSchedulesController],
      providers: [ItikafSchedulesService],
    }).compile();

    controller = module.get<ItikafSchedulesController>(ItikafSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
