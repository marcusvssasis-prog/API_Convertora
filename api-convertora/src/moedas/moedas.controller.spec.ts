import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoedasController } from './moedas.controller';
import { MoedasService } from './moedas.service';
import { Moeda } from './entities/moeda.entity';
import { CotacaoMoeda } from './entities/cotacao-moeda.entity';
import { ConversaoHistorico } from './entities/conversao-historico.entity';

describe('MoedasController', () => {
  let controller: MoedasController;

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
      controllers: [MoedasController],
      providers: [
        MoedasService,
        { provide: getRepositoryToken(Moeda), useValue: mockRepo },
        { provide: getRepositoryToken(CotacaoMoeda), useValue: mockRepo },
        { provide: getRepositoryToken(ConversaoHistorico), useValue: mockRepo },
      ],
    }).compile();

    controller = module.get<MoedasController>(MoedasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
