import { ProcessingError } from '@adhityan/gc-doc';


export class UserDoesNotExistError extends ProcessingError {
    public readonly message = 'User does not exist';

    constructor(email?: string) {
        super();
        console.log('UserDoesNotExistError', { email });
    }
}
