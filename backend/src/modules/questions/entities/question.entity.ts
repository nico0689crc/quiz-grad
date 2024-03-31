import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Quize } from 'src/modules/quizes/entities/quize.entity';
import { Answer } from 'src/modules/answers/entities/answer.entity';
import { RoomQuestion } from 'src/modules/room-questions/entities/room-questions.entity';

export enum TypeAnswer {
  SINGLE_ANSWER = 'SINGLE_ANSWER',
  MULTIPLE_ANSWERS = 'MULTIPLE_ANSWERS',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  order: number;

  @Column({ default: 15 })
  secondsToDeliverAnswer: number;

  @Column({
    type: 'enum',
    enum: TypeAnswer,
    default: TypeAnswer.SINGLE_ANSWER
  })
  typeAnswer: TypeAnswer;

  @CreateDateColumn()
  @Exclude()
  createdAt: number;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: number;

  @ManyToOne(() => Quize, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  quiz: Quize;

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: ['insert'],
  })
  @JoinColumn()
  answers: Answer[];

  @OneToMany(() => RoomQuestion, (roomQuestion) => roomQuestion.question)
  @JoinColumn()
  roomQuestions: RoomQuestion[];
}
