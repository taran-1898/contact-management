import * as crypto from 'crypto';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IncorrectCredentialsError, InvalidEmailError, UserAlreadyExists, UserDoesNotExistError, UserNotVerifiedError } from '../errors';
import { CreateUserRequest } from '../models';
import { User } from '../orm/entities';
import { EncryptionUtils } from '../utils/encryption.util';
import { Config } from '../config';
import sgMail from '@sendgrid/mail';

@Service()
export class UserService {
    @InjectRepository(User)
    private readonly userRepo: Repository<User>

    public async createUser(user: CreateUserRequest): Promise<User> {
        const existingUser = await this.userRepo.find({ where: { email: user.email } })
        if (existingUser && existingUser.length) throw new UserAlreadyExists(user.email)
        const salt = crypto.randomBytes(128).toString('base64');
        const passwordHash = EncryptionUtils.passwordEncryption(user.password, salt);
        user.password = passwordHash;
        user.salt = salt;
        console.log(user)
        const createdUser = await this.userRepo.save(user)
        await this.sendVerificationMail(createdUser)
        return createdUser
    }

    public async login(email: string, password: string): Promise<User> {
        const existingUser = await this.userRepo.findOne({ where: { email } })
        if (!existingUser) throw new UserDoesNotExistError(email)
        if (!existingUser.isVerified) throw new UserNotVerifiedError(email)
        const passwordHash = EncryptionUtils.passwordEncryption(password, existingUser.salt);
        if (JSON.stringify(existingUser.password) !== JSON.stringify(passwordHash)) throw new IncorrectCredentialsError()
        return existingUser
    }

    public async verify(token: string): Promise<Boolean> {
        const existingUser = await this.userRepo.findOne({ where: { token } })
        console.log(existingUser)
        if (!existingUser) throw new UserDoesNotExistError()
        existingUser.isVerified = true
        await this.userRepo.save(existingUser)
        return true
    }

    // eslint-disable-next-line class-methods-use-this
    public async sendVerificationMail(user: User): Promise<boolean> {
        sgMail.setApiKey(Config.SENDGRID_API_KEY);
        user.token = EncryptionUtils.generateString(42);
        await this.userRepo.save(user)
        const link = `${Config.HOST}/api/user/verify/${user.token}`
        const msg: { to: string; from: string; subject: string; text: string; html?: string } = {
            from: Config.SENDER_MAIL,
            subject: 'Verification',
            text: `Hi, \nPlease click on this link to verify.\n${link}`,
            to: user.email,
        };
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.body);
            }
            return false;
        }
        return true;
    }
}