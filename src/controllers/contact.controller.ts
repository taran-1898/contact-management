import { request } from 'http';
import { JsonController, Post, Body, Delete, Param, UseBefore, Req, Get, QueryParam } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AuthorizationMiddleware } from '../middlewares';

import { CreateContactRequest, GenericResponse, GetContactsResponse } from '../models';
import { ContactService } from '../services';

@JsonController('/contact')
@Service()
@UseBefore(AuthorizationMiddleware)
export class ContactController {
    @Inject()
    private contactService: ContactService

    @Post('/create')
    // eslint-disable-next-line class-methods-use-this
    public async createContact(
        @Body() contact: CreateContactRequest,
        @Req() request
    ): Promise<GenericResponse> {
        await this.contactService.createContact(contact, request.user)
        return new GenericResponse('Contact created Successfully')
    }

    @Delete('/delete/:id')
    // eslint-disable-next-line class-methods-use-this
    public async deleteContact(
        @Param('id') id: string
    ): Promise<GenericResponse> {
        await this.contactService.deleteContact(id)
        return new GenericResponse('Contact deleted Successfully')
    }

    @Get('/')
    // eslint-disable-next-line class-methods-use-this
    public async getContacts(
        @Req() request,
        @QueryParam('id', { required: false }) id?: string
    ): Promise<GetContactsResponse> {
        const userId = request.user.id
        return new GetContactsResponse(await this.contactService.getContacts(userId, id));
    }
}
