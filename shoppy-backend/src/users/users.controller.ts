import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateuserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post()
    @UseInterceptors(NoFilesInterceptor())
    createUser(@Body() request:CreateuserRequest ){
        return this.userService.createUser(request);
    }
}
