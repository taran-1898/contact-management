import { ProcessingError } from '@adhityan/gc-doc';


export class InvalidEmailError extends ProcessingError {
    public readonly message = 'Invalid E-mail';

    constructor(email: string) {
        super();
        console.log('InvalidEmailError', { email });
    }
}
