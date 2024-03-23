import { Exclude } from 'class-transformer';
import { Player } from 'src/modules/players/entities/players.entity';
import { Quize } from 'src/modules/quizes/entities/quize.entity';
import { RoomQuestion } from 'src/modules/room-questions/entities/room-questions.entity';

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum RoomStatus {
  WAITING_PLAYERS = 'WAITING_PLAYERS',
  PLAYING = 'PLAYING',
  CALCULATING = 'CALCULATING',
  DONE = 'DONE',
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false, unique: true })
  inviteCode: string;

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.WAITING_PLAYERS,
  })
  status: RoomStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @ManyToOne(() => Quize, (quiz) => quiz.rooms, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  quiz: Quize;

  @OneToMany(() => Player, (player) => player.room)
  @JoinColumn()
  players: Player[];

  @OneToMany(() => RoomQuestion, (roomQuestion) => roomQuestion.room)
  @JoinColumn()
  roomQuestions: RoomQuestion[];
}
