import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from '../application/auth.service';

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

// default
// JNUQIivJInzSxbSQe0iG5K9GPod2ZNVR