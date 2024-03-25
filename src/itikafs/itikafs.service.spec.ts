import { Test, TestingModule } from '@nestjs/testing';
import { ItikafsService } from './itikafs.service';

describe('ItikafsService', () => {
  let service: ItikafsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItikafsService],
    }).compile();

    service = module.get<ItikafsService>(ItikafsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
