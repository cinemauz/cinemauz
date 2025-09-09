import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { config } from 'src/config/env.config';
import { successRes } from 'src/infrastructure/response/succesRes';
import { TokenService } from 'src/infrastructure/token/Token';
import { IToken } from 'src/infrastructure/token/token.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: TokenService) {}
// ================================== NEW TOKEN ==================================
  async newToken(repository: Repository<any>, token: string) {
    const data: any = await this.jwt.verifyToken(
      token,
      config.TOKEN.REFRESH_KEY,
    );
    if (!data) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await repository.findOne({ where: { id: data?.id } });
    if (!user) {
      throw new ForbiddenException('Forbiden user');
    }

    const payload: IToken = {
      id: user.id,
      is_active: user.is_active,
      role: user.role,
    };
    const accessToken = await this.jwt.accessToken(payload);
    return successRes({ token: accessToken });
  }

  async signOut(repository: Repository<any>, token: string, res: Response, tokenKey: string) {
     const data: any = await this.jwt.verifyToken(
       token,
       config.TOKEN.REFRESH_KEY,
     );
     if (!data) {
       throw new UnauthorizedException('Refresh token expired');
     }

     const user = await repository.findOne({ where: { id: data?.id } });
     if (!user) {
       throw new ForbiddenException('Forbiden user');
     }
    res.clearCookie(tokenKey)
    return successRes({})
  }
}
