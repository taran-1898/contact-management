import jwt from 'jsonwebtoken';
import { JsonController, Post, Body, Get, Param } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Config } from '../config';

import { CreateUserRequest, GenericResponse, LoginRequest } from '../models';
import { UserService } from '../services';

@JsonController('/user')
@Service()
export class UserController {
    @Inject()
    private userService: UserService

    @Post('/')
    // eslint-disable-next-line class-methods-use-this
    public async createUser(@Body() user: CreateUserRequest): Promise<GenericResponse> {
        await this.userService.createUser(user)
        return new GenericResponse('User created Successfully')
    }

    @Post('/login')
    // eslint-disable-next-line class-methods-use-this
    public async login(
        @Body() request: LoginRequest
    ): Promise<GenericResponse> {
        const user = await this.userService.login(request.email, request.password)

        const privateKey = Config.RSA_PRIVATE_KEY;
        console.log(privateKey)
        const token = await jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                user,
            },
            privateKey,
            { algorithm: 'RS256' },
        );
        return new GenericResponse(token)
    }

    @Get('/verify/:token')
    // eslint-disable-next-line class-methods-use-this
    public async verify(
        @Param('token') token: string
    ): Promise<GenericResponse> {
        await this.userService.verify(token)
        return new GenericResponse('Success');
    }
}
