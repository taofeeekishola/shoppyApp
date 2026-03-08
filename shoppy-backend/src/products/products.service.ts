import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';

@Injectable()
export class ProductsService {
    constructor (
        private readonly prismaService: PrismaService
    ){}

    /**
     * function to create a function
     * @param data 
     * @param userId 
     * @returns 
     */
    async createProduct (data: CreateProductRequest, userId: number){
        return this.prismaService.product.create({
            data:{
                ...data,
                userId
            }
        })
    }

    /**
     * fucntion to get products
     * @returns 
     */
    async getProducts(){
        const products = await this.prismaService.product.findMany();
        
        //
        return Promise.all(
            products.map(async (product) =>({
                ...product,
                imageExists: await this.imageExists(product.id)
            }))
        )
    }

    /**
     * function to check if the product has an image
     * @param productId 
     * @returns 
     */
    private async imageExists(productId: number){
        try{
            await fs.access(
                join(process.cwd(), `public/products/${productId}.jpg`),
                fs.constants.F_OK,
            )
            return true;
        } catch (err){
            return false;
        }
    }

}
