import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    /**
     * injecting UsersService
     * @param usersService 
     */
    constructor(private readonly usersService: UsersService){}

    /**
     * authenticating the user
     * @param email 
     * @param password 
     * @returns 
     */
    async verifyUser(email: string, password: string){
        try{
            const user = await this.usersService.getUser({ email });
            const authenticated =await bcrypt.compare(password, user.password);

            if(!authenticated){
                throw new UnauthorizedException();
            }
            return user;
        }catch(err){
            throw new UnauthorizedException('Credentials are not valid.');
        }
    }
}
