import { Injectable } from '@nestjs/common';
import { CreateuserRequest } from './dto/create-user.request';

@Injectable()
export class UsersService {
    createUser(data: CreateuserRequest){
        console.log(data);
    }
}
