import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

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

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }


}