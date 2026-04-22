import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

/**
 * Gateway provider
 */
@WebSocketGateway({
    cors:{
        origin: '*' //acceping traggic from any origin
    }
})
export class ProductGateway{

    //getting the native websocket server
    @WebSocketServer() 
    private readonly server:  Server | undefined;

    handleProductUpdated(){
        this.server?.emit('productUpdated')
    }

}