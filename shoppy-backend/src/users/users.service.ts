import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { CreateuserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma/client';

@Injectable()
export class UsersService {
    constructor (private readonly prismaService: PrismaService){}

    /**
     * creates a new user
     * @param data 
     * @returns 
     */
    async createUser(data: CreateuserRequest){
        try{
            return await this.prismaService.user.create({
                data: {
                    ...data,
                    password: await bcrypt.hash(data.password, 10),
                },
                select:{
                    email: true,
                    id: true,
                }
            });
        } catch (err){
            console.error(err);
            if(err.code === 'P2002'){
                throw new UnprocessableEntityException('Email already exists');
            }
            throw err;
        }
    }


    /**
     * checks if a user exists
     * @param filter 
     * @returns 
     */
    async getUser(filter: Prisma.UserWhereUniqueInput){
        return this.prismaService.user.findUniqueOrThrow({
            where: filter,
        })
    }
}
