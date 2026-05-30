import { Test, TestingModule } from '@nestjs/testing';
import { MoedasService } from './moedas.service';

describe('MoedasService', () => {
  let service: MoedasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoedasService],
    }).compile();

    service = module.get<MoedasService>(MoedasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
