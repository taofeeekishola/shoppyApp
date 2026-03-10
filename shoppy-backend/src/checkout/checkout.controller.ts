import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateSessionRequest } from './dto/create-session.request';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {

    constructor(
        private readonly checkoutService: CheckoutService
    ){}


    /**
     * function to create a new stripe api checkout session
     * @param request 
     * @returns 
     */
    @Post('session')
    @UseGuards(JwtAuthGuard) 
    async createSession(
        @Body() request: CreateSessionRequest
    ){
        return this.checkoutService.createSession(request.productId)
    }
}
