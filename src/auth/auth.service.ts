import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from 'src/users/users.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    private blacklistedTokens: Set<string> = new Set();


    async signIn(email: string, pass: string): Promise<any> {
        const user: User = await this.usersService.findByEmail(email);

        // not found
        if (!user) throw new UnauthorizedException('Invalid Credentials!');

        // check email compare
        const isMatch = await bcrypt.compare(pass, user?.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        // not active
        if (!user.active) throw new UnauthorizedException('User is deactivated!');

        // Generate a JWT and return it here
        // instead of the user object
        const { access_token, exp } = await this.createToken(user.id, user.email, user.role);

        delete user.password;
        return { access_token, exp, user };
    }

    async createToken(userId: string, email: string, role: string): Promise<Record<string, any>> {
        const payload = {
            sub: userId,
            username: email,
            role: role
        };

        const access_token = await this.jwtService.signAsync(payload) as string;
        const exp: number = Math.round(dayjs().add(7, 'd').valueOf());
        const expiredAt = new Date(exp);

        // save to db
        await this.createAuth(userId, access_token, expiredAt);

        return { access_token, exp };
    }

    async createAuth(userId: string, token: string, expiredAt: Date, path = '/auth/login', method = 'POST'): Promise<void> {

        const data: Prisma.AuthCreateInput = {
            user: {
                connect: { id: userId }
            },
            token,
            method,
            path,
            expiredAt,
        };

        await this.prisma.auth.create({ data });
    }

    addBlackListToken(token: string) {
        this.blacklistedTokens.add(token);
    }

    isTokenBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }

}
