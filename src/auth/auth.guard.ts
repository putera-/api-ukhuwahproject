import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/auth/auth.metadata';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import dayjs from 'dayjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        let isTokenBlackListed = false;

        if (token) {
            // for non auth & auth controller
            isTokenBlackListed = this.authService.isTokenBlacklisted(token);

            if (!isTokenBlackListed) {
                // token masih berlaku
                await this.setUser(request, token)
            }
        }

        if (isPublic) return true;

        if (!token) {
            throw new UnauthorizedException();
        }

        // check is token in black listed
        if (isTokenBlackListed) {
            throw new UnauthorizedException();
        }

        try {
            const user = await this.setUser(request, token)

            await this.authService.createAuth(
                // sub,
                user.id,
                token,
                dayjs(user.exp * 1000).toDate(),
                request.path,
                request.method
            )
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private async setUser(request: any, token: string): Promise<Record<string, any>> {
        const { sub, ...user } = await this.jwtService.verifyAsync(
            token,
            {
                secret: jwtConstants.secret
            }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        user.id = sub
        request['user'] = user;

        return user;
    }
}
