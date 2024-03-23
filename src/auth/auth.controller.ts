import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/auth.metadata';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        // tolowercase
        signInDto.email = signInDto.email.toLowerCase().trim();

        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Get('extend-access-token')
    async extendAccessToken(@Req() req) {
        const user = req.user;
        const { access_token, exp } = await this.authService.createToken(user.id, user.username, user.role);

        // black list old token
        const token = req.headers.authorization.split(' ')[1];
        this.authService.addBlackListToken(token);

        return { access_token, exp };
    }

    @Delete('logout')
    @HttpCode(204)
    logOut(@Req() req) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            this.authService.addBlackListToken(token);
        } catch (error) {
            throw error;
        }
    }

    @Get('profile')
    getProfile(@Request() req) {
        try {
            const user = req.user;
            return this.userService.findOne(user.id, user.role);
        } catch (error) {
            throw error;
        }

    }

}
