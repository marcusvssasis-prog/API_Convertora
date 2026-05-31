import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoedasService } from './moedas.service';
import { Moeda } from './entities/moeda.entity';
import { CotacaoMoeda } from './entities/cotacao-moeda.entity';
import { ConversaoHistorico } from './entities/conversao-historico.entity';

describe('MoedasService', () => {
  let service: MoedasService;

  beforeEach(async () => {
    const mockRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoedasService,
        { provide: getRepositoryToken(Moeda), useValue: mockRepo },
        { provide: getRepositoryToken(CotacaoMoeda), useValue: mockRepo },
        { provide: getRepositoryToken(ConversaoHistorico), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<MoedasService>(MoedasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
