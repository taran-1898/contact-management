import { ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers';

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Config } from '../config';
import { Service } from 'typedi';

@Service()
export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public async use(request: Request, _response: Response, next: () => Promise<unknown>): Promise<unknown> {
        let token = request.cookies?.token;
        if (!token) token = <string>(request.headers.authorization || request.headers.Authorization);
        if (!token) throw new UnauthorizedError('Missing authorization token!');
        token = token.split('Bearer ')[1]
        console.log(token)
        let decodedToken
        try {
            decodedToken = jwt.verify(token, Config.RSA_PRIVATE_KEY, { algorithms: ['RS256'] });
        } catch (err) {
            console.log('Token decode failed', err);
            throw new UnauthorizedError('invalid authorization token');
        }
        if (decodedToken.user)
            request.user = decodedToken.user;
        return next();
    }
}
