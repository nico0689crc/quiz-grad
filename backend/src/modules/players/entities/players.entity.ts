import { Exclude } from 'class-transformer';
import { RoomQuestionAnswer } from 'src/modules/room-question-answers/entities/room-question-answers.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum PlayerType {
  PLAYER = 'PLAYER',
  MODERATOR = 'MODERATOR',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false, unique: true })
  uuid: string;

  @Column({ nullable: false })
  socketId: string;

  @Column({ nullable: false, default: true })
  connected: boolean;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false })
  avatar: string;

  @Column({
    type: 'enum',
    enum: PlayerType,
    default: PlayerType.PLAYER,
  })
  playerType: PlayerType;

  @ManyToOne(() => Room, (room) => room.players, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  room: Room;

  @OneToMany(() => RoomQuestionAnswer, (roomQuestionAnswer) => roomQuestionAnswer.player, {
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
