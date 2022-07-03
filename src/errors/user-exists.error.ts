import { ProcessingError } from '@adhityan/gc-doc';


export class UserAlreadyExists extends ProcessingError {
    public readonly message = 'Entity already exists';

    constructor(email: string) {
        super();
        console.log('EntityAlreadyExists', { email });
    }
}
