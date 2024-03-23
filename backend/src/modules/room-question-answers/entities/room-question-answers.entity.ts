import { Exclude } from 'class-transformer';
import { Player } from 'src/modules/players/entities/players.entity';
import { RoomQuestion } from 'src/modules/room-questions/entities/room-questions.entity';

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum RoomQuestionAnswerStatus {
  DONE = 'DONE',
  CURRENT = 'CURRENT',
  PENDING = 'PENDING',
}

@Entity()
export class RoomQuestionAnswer {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false })
  isCorrect: boolean;

  @Column({ type: 'float', nullable: true })
  points: number;

  @ManyToOne(() => RoomQuestion, (roomQuestion) => roomQuestion.roomQuestionAnswers, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  roomQuestion: RoomQuestion;

  @ManyToOne(() => Player, (player) => player.roomQuestionAnswers, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  player: Player;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: number;
}
