import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CreateProductRequest } from './dto/create-product.request';
import { TokenPayLoad } from '../auth/toekn-payload.interface';
import { CurrentUser } from '../auth/current-user.decorator';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
    constructor (
        private readonly productsService: ProductsService,
    ){}

    /**
     * function to create a new product
     * @param body 
     * @param user 
     * @returns 
     */
    @Post()
    @UseGuards(JwtAuthGuard)
    async createProduct(
        @Body() body: CreateProductRequest,
        @CurrentUser() user: TokenPayLoad
    ){
        return this.productsService.createProduct(body, user.userId);
    }

    @Post(':productId/image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: 'public/products',
                filename: (req, file, callback) => {
                    callback(null, 
                        `${req.params.productId}${extname(file.originalname)}`
                    );
                },
            }),
        }),
    )
    uploadProductImage(
        @UploadedFile(
            new ParseFilePipe({
                validators:[
                    new MaxFileSizeValidator({ maxSize: 500000 }),
                    new FileTypeValidator({ fileType: 'image/jpeg'}),
                ],
            }),
        )
        _file: Express.Multer.File
    ){}
    
    /**
     * function to get all products
     * @returns 
     */
    @Get()
    @UseGuards(JwtAuthGuard)
    async getProducts(){
        return this.productsService.getProducts();
    }
}
