import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly apiKey;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = configService.get('APIKEY');
  }

  isValidApikey(key: string) {
    return this.apiKey && key && this.apiKey === key;
  }
}
