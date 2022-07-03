import { ProcessingError } from '@adhityan/gc-doc';

export class IncorrectCredentialsError extends ProcessingError {
    public readonly message = 'The credentials are incorrect';

    constructor() {
        super();
        console.log('IncorrectCredentialsError');
    }
}
