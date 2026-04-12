import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckoutService {
    constructor(
        private readonly stripe: Stripe,
        private readonly productService: ProductsService,
        private readonly configService: ConfigService
    ){}

    /**
     * function to create a new stripe api checkout session
     * @param productId 
     */
    async createSession(productId: number){
        const product = await this.productService.getProduct(productId);
        return this.stripe.checkout.sessions.create({
            metadata:{
                productId,
            },
            line_items: [
                {
                    price_data:{
                        currency: 'usd',
                        unit_amount: Math.round(product.price * 100),
                        product_data:{
                            name: product.name,
                            description: product.description,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url:this.configService.getOrThrow('STRIPE_SUCCESS_URL'),
            cancel_url:this.configService.getOrThrow('STRIPE_CANCEL_URL')
        })
    }

    async handleCheckoutWebhooks(event: any){
        if(event.type !== 'checkout.session.completed'){
            return;
        }

        const session = await this.stripe.checkout.sessions.retrieve(
            event.data.object.id,
        );


        if (!session.metadata || !session.metadata.productId) {
            throw new Error('Missing productId in metadata');
        }

        await this.productService.update(parseInt(session.metadata.productId), {
            sold: true
        })
    }
}
