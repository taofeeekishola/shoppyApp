import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guards';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(){
        
    }
}
