import { Column, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Moeda } from "./moeda.entity";

@Entity()
export class CotacaoMoeda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 6 })
  valor: number; // sempre contra USD

  @CreateDateColumn()
  dataModificacao: Date;

  @ManyToOne(() => Moeda, (m) => m.cotacoes)
  moeda: Moeda;
}

