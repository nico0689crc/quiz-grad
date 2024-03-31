import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Question } from 'src/modules/questions/entities/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  uuid: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  order: number;

  @Column({ nullable: false })
  isCorrect: boolean;

  @CreateDateColumn()
  @Exclude()
  createdAt: number;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Question;
}
