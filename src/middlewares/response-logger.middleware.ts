import { Service } from 'typedi';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';


import { UNKNOWN_ENDPOINT, httpStatusCodes } from '../constants';
import { HealthResponse } from '../models';

@Service()
@Middleware({ type: 'after' })
export class ResponseLoggerMiddleware implements ExpressMiddlewareInterface {
    // eslint-disable-next-line class-methods-use-this
    public use(request: Express.Request, response: Express.Response): void {
        if (!response.headersSent) {
            response.status(httpStatusCodes.NOT_FOUND);
            response.send(new HealthResponse(UNKNOWN_ENDPOINT.message, UNKNOWN_ENDPOINT.statusCode));
            response.end();
        }

        const responseTime = new Date().getTime() - response.startTime.getTime();
        console.log(`Response took ${responseTime}ms with status code ${response.statusCode}`);
    }
}
