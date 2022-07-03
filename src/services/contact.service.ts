import * as crypto from 'crypto';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IncorrectCredentialsError, UserAlreadyExists, UserDoesNotExistError } from '../errors';
import { CreateContactRequest, CreateUserRequest } from '../models';
import { Contact, User } from '../orm/entities';
import { EncryptionUtils } from '../utils/encryption.util';

@Service()
export class ContactService {
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>

    public async createContact(contact: CreateContactRequest, user): Promise<Contact> {
        const existingContact = await this.contactRepo.find({ where: { email: contact.email } })
        if (existingContact && existingContact.length) throw new UserAlreadyExists(contact.email)
        contact.userId = user.id
        console.log(contact)
        return await this.contactRepo.save(contact)
    }

    public async deleteContact(id: string): Promise<Boolean> {
        await this.contactRepo.delete(id)
        return true
    }

    public async getContacts(userId: string, id?: string): Promise<Contact[]> {
        let where: { userId: string; id?: string; }
        where = { userId }
        id && (where.id = id)
        return await this.contactRepo.find({ where })
    }


    // public async login(email: string, password: string): Promise<User> {
    //     const existingUser = await this.userRepo.findOne({ where: { email } })
    //     if (!existingUser) throw new UserDoesNotExistError(email)
    //     const passwordHash = EncryptionUtils.passwordEncryption(password, existingUser.salt);
    //     if (password !== passwordHash) throw new IncorrectCredentialsError()
    //     return existingUser
    // }
}
