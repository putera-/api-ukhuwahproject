import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from 'src/users/user.interface';

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

        // deleted
        if (user.deleted) throw new UnauthorizedException('User is deleted!');

        // Generate a JWT and return it here
        // instead of the user object
        const payload = {
            sub: user.id,
            username: user.email,
            role: user.role
        };

        const access_token: string = await this.jwtService.signAsync(payload) as string;
        // expired date, add 1 day
        const exp: number = Math.round(dayjs().add(1, 'd').valueOf());

        await this.createAuth(user.id, access_token, exp);

        return { access_token, exp };
    }

    async createAuth(userId: string, access_token: string, exp?: number): Promise<void> {
        if (!exp) {
            // expired date, add 1 day
            exp = Math.round(dayjs().add(1, 'd').valueOf());
        }

        const data: Prisma.AuthCreateInput = {
            user: {
                connect: { id: userId }
            },
            access_token,
            exp,
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
