import { ProcessingError } from '@adhityan/gc-doc';


export class UserNotVerifiedError extends ProcessingError {
    public readonly message = 'User is not verified';

    constructor(email: string) {
        super();
        console.log('UserNotVerifiedError', { email });
    }
}
