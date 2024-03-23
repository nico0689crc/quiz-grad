import { Exclude } from 'class-transformer';
import { RoomQuestionAnswer } from 'src/modules/room-question-answers/entities/room-question-answers.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum RoomQuestionStatus {
  DONE = 'DONE',
  CURRENT = 'CURRENT',
  PENDING = 'PENDING',
}

@Entity()
export class RoomQuestion {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({
    type: 'enum',
    enum: RoomQuestionStatus,
    default: RoomQuestionStatus.PENDING,
  })
  status: RoomQuestionStatus;

  @ManyToOne(() => Room, (room) => room.roomQuestions, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  room: Room;

  @ManyToOne(() => Question, (question) => question.roomQuestions, {
    onDelete: 'RESTRICT',
  })
  @Exclude()
  question: Question;

  @OneToMany(() => RoomQuestionAnswer, (roomQuestionAnswer) => roomQuestionAnswer.roomQuestion, {
    cascade: ['insert'],
  })
  @JoinColumn()
  roomQuestionAnswers: RoomQuestionAnswer[];

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: number;
}
