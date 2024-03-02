import { Test, TestingModule } from '@nestjs/testing';
import { UserSuperadminController } from './user-superadmin.controller';

describe('UserSuperadminController', () => {
  let controller: UserSuperadminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSuperadminController],
      providers: [],
    }).compile();

    controller = module.get<UserSuperadminController>(UserSuperadminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
