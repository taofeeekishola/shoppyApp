import { Injectable, UnauthorizedException } from '@nestjs/common';
import ms from 'ms';
import * as bcrypt from 'bcrypt'
import { Response } from 'express';
import { User } from 'generated/prisma/client';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayLoad } from './toekn-payload.interface';

@Injectable()
export class AuthService {
    /**
     * injecting UsersService
     * @param usersService 
     */
    constructor(private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService, 
    ){}


    async login(user: User, response: Response){
        // Read the JWT expiration duration from config (e.g., "10h") 
        // and calculate the exact expiration date by adding that duration 
        // (converted to milliseconds) to the current time.
        const expiration = this.configService.get<string>('JWT_EXPIRATION');

        const expires = new Date(
        Date.now() + ms(expiration as any),
        );

        const tokenPayLoad: TokenPayLoad = {
            userId: user.id,
        };

        const token = this.jwtService.sign(tokenPayLoad);

        response.cookie('Authentication', token, {
            secure: true,
            httpOnly: true,
            expires:expires
        });

        return { tokenPayLoad };
    }

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

    /**
     * verify token
     * @param jwt 
     */
    verifyToken(jwt: string){
        this.jwtService.verify(jwt);
    }
}
