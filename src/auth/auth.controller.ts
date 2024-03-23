import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Req, Request, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/auth.metadata';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { PhotosService } from 'src/photos/photos.service';
import path from 'path';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private photoService: PhotosService
    ) { }

    @Public()
    @Post('register')
    async create(@Body(new ValidationPipe()) data: CreateUserDto) {
        try {
            // validate new user
            await this.usersService.validateNewUser(data);

            return this.usersService.create(data);
        } catch (error) {
            throw error;
        }
    }

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
            return this.usersService.findOne(user.id, user.role);
        } catch (error) {
            throw error;
        }
    }

    // update selft superadmin, admin, staff, member
    @Patch('profile')
    @UseInterceptors(FileInterceptor('avatar'))
    async update(@Req() req, @Body(new ValidationPipe()) data: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
        // for avatar
        const ext = file ? file.originalname.split('.').pop() : '';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // only can update belongs to auth user
        const { id } = req.user;

        // handle change password
        if (data.password) await this.usersService.checkPassword(data);

        // prevent change email
        if (data.email) delete data.email;

        try {
            if (file) {
                const avatarBuffer = file.buffer;

                // resize images to 600, 900, 1200
                const sizes = [{ key: 'md', size: 900 }, { key: 'lg', size: 1200 }];
                await Promise.all(
                    sizes.map(async (s) => {
                        const { key, size } = s;
                        const filename = `${uniqueSuffix}_${key}.${ext}`;
                        const filepath = path.join('./uploads/photos/' + filename);

                        await this.photoService.resize(size, avatarBuffer, filepath);
                    })
                );

                data.avatar = `/uploads/photos/${uniqueSuffix}_lg.${ext}`;
                data.avatar_md = `/uploads/photos/${uniqueSuffix}_md.${ext}`;
            }

            return this.usersService.update(id, data);
        } catch (error) {
            // remove avatar
            if (file) {
                this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_lg.${ext}`)
                this.photoService.removeFile(`/uploads/photos/${uniqueSuffix}_md.${ext}`)
            }
            throw error;
        }
    }
}
