import { Exclude } from 'class-transformer';
import { User } from 'src/modules/users/entities/user.entity';
import { Question } from 'src/modules/questions/entities/question.entity';

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { getRandomCoverImageUrl } from 'src/core/helpers';
import { Room } from 'src/modules/rooms/entities/room.entity';

export enum QuizStatus {
  DOWN = 'DOWN',
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  PLAYING = 'PLAYING',
}

@Entity()
export class Quize {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ default: 10 })
  maxPlayerAmount: number;

  coverUrl: string = getRandomCoverImageUrl();

  @Column({
    type: 'enum',
    enum: QuizStatus,
    default: QuizStatus.DOWN,
  })
  status: QuizStatus;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: number;

  @ManyToOne(() => User, (user) => user.quizs, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  creator: User;

  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: ['insert'],
  })
  @JoinColumn()
  questions: Question[];

  @OneToMany(() => Room, (room) => room.quiz, {
    cascade: ['insert'],
  })
  @JoinColumn()
  rooms: Room[];
}
