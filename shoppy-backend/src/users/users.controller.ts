import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateuserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayLoad } from 'src/auth/toekn-payload.interface';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post()
    @UseInterceptors(NoFilesInterceptor())
    createUser(@Body() request:CreateuserRequest ){
        return this.userService.createUser(request);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(
        @CurrentUser() user: TokenPayLoad
    ){
        return user;
    }
}
