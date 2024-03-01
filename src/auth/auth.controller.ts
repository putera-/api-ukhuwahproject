import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/auth.metadata';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        // tolowercase
        signInDto.email = signInDto.email.toLowerCase().trim();

        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
