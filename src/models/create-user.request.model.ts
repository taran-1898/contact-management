import { RequestBase } from '@adhityan/gc-doc';
import { IsNotEmpty, IsNumberString, IsPhoneNumber, IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateUserRequest extends RequestBase {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @MinLength(7)
    @Matches(/(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
        message: 'Password too weak! Pin must contain an alphabet, digit for your protection.',
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    salt?: string
}
