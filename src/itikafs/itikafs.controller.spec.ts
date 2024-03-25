import { Test, TestingModule } from '@nestjs/testing';
import { ItikafsController } from './itikafs.controller';
import { ItikafsService } from './itikafs.service';

describe('ItikafsController', () => {
  let controller: ItikafsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItikafsController],
      providers: [ItikafsService],
    }).compile();

    controller = module.get<ItikafsController>(ItikafsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
