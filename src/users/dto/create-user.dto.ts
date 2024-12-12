import { IsString, MinLength, IsEnum } from 'class-validator';
import { PlatformType } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(PlatformType)
  platform: PlatformType = PlatformType.LOCAL;
} 