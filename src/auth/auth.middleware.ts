import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apikey = req.headers['apikey'];

    if (!this.authService.isValidApikey(apikey)) {
      throw new UnauthorizedException();
    }

    next();
  }
}
