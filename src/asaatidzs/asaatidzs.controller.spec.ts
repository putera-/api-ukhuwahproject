import { Test, TestingModule } from '@nestjs/testing';
import { AsaatidzsController } from './asaatidzs.controller';
import { AsaatidzsService } from './asaatidzs.service';

describe('AsaatidzsController', () => {
  let controller: AsaatidzsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsaatidzsController],
      providers: [AsaatidzsService],
    }).compile();

    controller = module.get<AsaatidzsController>(AsaatidzsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
