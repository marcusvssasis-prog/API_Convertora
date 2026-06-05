import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CotacaoMoeda } from "./cotacao-moeda.entity";

@Entity()
export class Moeda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @OneToMany(() => CotacaoMoeda, (c) => c.moeda)
  cotacoes: CotacaoMoeda[];
}
