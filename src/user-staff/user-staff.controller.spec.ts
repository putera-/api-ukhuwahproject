import { Test, TestingModule } from '@nestjs/testing';
import { UserStaffController } from './user-staff.controller';

describe('UserStaffController', () => {
  let controller: UserStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStaffController],
      providers: [],
    }).compile();

    controller = module.get<UserStaffController>(UserStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
