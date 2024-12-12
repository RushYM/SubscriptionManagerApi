import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 사용자 존재 여부 확인
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 새 사용자 생성
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    // 비밀번호 제외하고 반환
    const { password, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 마지막 로그인 시간 업데이트
    user.lastLoginAt = new Date();
    await this.usersRepository.save(user);

    // JWT 토큰 생성
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
