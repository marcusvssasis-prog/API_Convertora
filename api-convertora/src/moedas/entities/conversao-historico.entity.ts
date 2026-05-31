import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConversaoHistorico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moedaFrom: string;

  @Column()
  moedaTo: string;

  @Column('decimal', { precision: 18, scale: 6 })
  amount: number;

  @Column('decimal', { precision: 18, scale: 6 })
  resultado: number;

  @Column('decimal', { precision: 18, scale: 6 })
  taxaFrom: number;

  @Column('decimal', { precision: 18, scale: 6 })
  taxaTo: number;

  @CreateDateColumn()
  dataCriacao: Date;
}
