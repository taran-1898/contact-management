import { RequestBase } from '@adhityan/gc-doc';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest extends RequestBase {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
