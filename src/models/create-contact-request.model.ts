import { RequestBase } from '@adhityan/gc-doc';
import { IsNotEmpty, IsNumberString, IsPhoneNumber, IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateContactRequest extends RequestBase {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    userId?: string
}
