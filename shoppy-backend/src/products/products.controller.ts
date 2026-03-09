import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CreateProductRequest } from './dto/create-product.request';
import { TokenPayLoad } from '../auth/toekn-payload.interface';
import { CurrentUser } from '../auth/current-user.decorator';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PRODUCT_IMAGES } from './product-images';

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

    /**
     * function to get the uploaded image and store in public folder
     * @param _file 
     */
    @Post(':productId/image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: PRODUCT_IMAGES,
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

    /**
     * function to get a single product
     * @param productId 
     * @returns 
     */
    @Get(':productId')
    @UseGuards(JwtAuthGuard)
    async getProduct(@Param('productId') productId: string){
        return this.productsService.getProduct(+productId);
    }
}
