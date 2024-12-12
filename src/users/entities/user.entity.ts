import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PlatformType {
  LOCAL = 'local',
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: PlatformType,
    default: PlatformType.LOCAL
  })
  platform: PlatformType;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date;
} 