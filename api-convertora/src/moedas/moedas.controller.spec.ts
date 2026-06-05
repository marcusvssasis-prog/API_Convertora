import { Test, TestingModule } from '@nestjs/testing';
import { MoedasController } from './moedas.controller';
import { MoedasService } from './moedas.service';

describe('MoedasController', () => {
  let controller: MoedasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoedasController],
      providers: [MoedasService],
    }).compile();

    controller = module.get<MoedasController>(MoedasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
