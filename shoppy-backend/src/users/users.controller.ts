import { Body, Controller, Post } from '@nestjs/common';
import { CreateuserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post()
    createUser(@Body() request:CreateuserRequest ){
        return this.userService.createUser(request);
    }
}
