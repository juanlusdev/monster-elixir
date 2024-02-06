import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/application/users.service';
import * as bcryptjs from 'bcryptjs';
import { RegisterDto } from '../domain/dto/register.dto';
import { LoginDto } from '../domain/dto/login.dto';

@Injectable()
export class AuthService {
  private readonly apiKey;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.apiKey = this.configService.get('APIKEY');
  }

  isValidApikey(key: string) {
    return this.apiKey && key && this.apiKey === key;
  }

  // https://bluuweb.dev/nestjs/auth-jwt.html

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOneByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcryptjs.hash(registerDto.password, 10);

    await this.usersService.create(
      registerDto.firstName,
      registerDto.lastName,
      registerDto.email,
      registerDto.role,
      hashedPassword,
    );

    return {
      message: 'User created successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, _id: user._id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
    };
  }
}
