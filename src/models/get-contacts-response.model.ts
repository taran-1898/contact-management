import { ResponseBase } from '@adhityan/gc-doc';
import { IsNumber } from 'class-validator';

export class GetContactsResponse extends ResponseBase {
    data: any;

    @IsNumber()
    statusCode: number;

    constructor(data: any, statusCode?: number) {
        super();
        this.data = data;
        this.statusCode = statusCode ?? 200;
    }
}
