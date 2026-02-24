import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";
import { TokenPayLoad } from "../toekn-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService,){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies.Authentication
            ]),
            secretOrKey: configService.getOrThrow('JWT_SECRET')
        });
    }

    /**
     * this returns the decoded token
     * @param payload 
     * @returns 
     */
    validate(payload: TokenPayLoad){
        return payload;
    }
}