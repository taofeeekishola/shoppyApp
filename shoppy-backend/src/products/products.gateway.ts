import { WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";

/**
 * Gateway provider
 */
@WebSocketGateway({
    cors:{
        origin: '*' //acceping traggic from any origin
    }
})
export class ProductGateway{

    constructor(
        private readonly authService: AuthService,
    ){}

    //getting the native websocket server
    @WebSocketServer() 
    private readonly server:  Server | undefined;

    handleProductUpdated(){
        this.server?.emit('productUpdated')
    }

    //called whenever a new conneection is received by the gateway
    handleConnection(client: Socket){
        try{
            this.authService.verifyToken(
                client.handshake.auth.Authentication.value
            )
        } catch(err){
            throw new WsException('Unauthorized.');
        }
    }

}