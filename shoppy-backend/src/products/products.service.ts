import { promises as fs } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { PRODUCT_IMAGES } from './product-images';
import { Prisma } from 'generated/prisma/client';
import { ProductGateway } from './products.gateway';

@Injectable()
export class ProductsService {
    constructor (
        private readonly prismaService: PrismaService,

        private readonly productGateway: ProductGateway,
    ){}

    /**
     * function to create a function
     * @param data 
     * @param userId 
     * @returns 
     */
    async createProduct (data: CreateProductRequest, userId: number){
        const product  = await this.prismaService.product.create({
            data:{
                ...data,
                userId
            }
        })
        this.productGateway.handleProductUpdated();
        return product;
    }

    /**
     * fucntion to get products
     * @returns 
     */
    async getProducts(status?: string){
        const args: Prisma.ProductFindManyArgs = {};
        if(status === 'avaliable'){
            args.where = {sold: false};
        }
        const products = await this.prismaService.product.findMany(args);
        
        //
        return Promise.all(
            products.map(async (product) =>({
                ...product,
                imageExists: await this.imageExists(product.id)
            }))
        )
    }


    /**
     * function to get a single product
     * @param productId 
     * @returns 
     */
    async getProduct(productId: number){
        try {
            return {
                ...(await this.prismaService.product.findUniqueOrThrow({
                    where:{ id: productId},
                })),
                imageExists: await this.imageExists(productId)
            };
        } catch (error) {
            throw new NotFoundException(`Product not found with ID ${productId}`)
        }
        
    }

    /**
     * function to check if the product has an image
     * @param productId 
     * @returns 
     */
    private async imageExists(productId: number){
        try{
            await fs.access(
                // join(process.cwd(), `public/products/${productId}.jpg`),
                join(`${PRODUCT_IMAGES}/${productId}.jpg`),
                fs.constants.F_OK,
            )
            return true;
        } catch (err){
            return false;
        }
    }

    /**
     * funciton to update the product status
     * @param productid 
     * @param data 
     */
    async update(productid: number, data: Prisma.ProductUpdateInput){
        await this.prismaService.product.update({
            where: {id: productid},
            data,
        })

        this.productGateway.handleProductUpdated();
    }

}
