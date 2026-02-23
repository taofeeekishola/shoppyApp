import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { CurrentUser } from './current-user.decorator';
import { User } from 'generated/prisma/client';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @CurrentUser() user:User,
        @Res({ passthrough: true}) response: Response
    ){
        return this.authService.login(user, response);
    }
}
