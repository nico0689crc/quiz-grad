import { Exclude } from 'class-transformer';
import { Quize } from 'src/modules/quizes/entities/quize.entity';

import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  QUIZ_CREATOR = 'QUIZ_CREATOR',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  uuid: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'confirmation_code', nullable: true })
  @Exclude()
  confirmationCode: string;

  @Column({ name: 'email_verified', default: false })
  @Exclude()
  emailVerified: boolean;

  @CreateDateColumn({ name: 'email_verified_at', default: null })
  @Exclude()
  emailVerifiedAt: Date;

  @Column({ name: 'password_reset_token', nullable: true })
  @Exclude()
  passwordResetToken: string;

  @CreateDateColumn({ name: 'password_reset_token_req_at', nullable: true })
  @Exclude()
  passwordResetTokenReqAt: Date;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  passwordConfirmation: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.QUIZ_CREATOR,
  })
  role: UserRole;

  @CreateDateColumn()
  @Exclude()
  createdAt: number;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: number;

  @OneToMany(() => Quize, (quiz) => quiz.creator, { onDelete: 'CASCADE' })
  @JoinColumn()
  quizs: Quize[];
}
