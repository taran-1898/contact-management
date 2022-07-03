import crypto from 'crypto';

export class EncryptionUtils {
    // Creating a function to encrypt string
    public static encryptString(plaintext: string, privateKey: string): string {
        // privateEncrypt() method with its parameters
        const encrypted = crypto.publicEncrypt({ key: privateKey }, Buffer.from(plaintext));
        return encrypted.toString('base64');
    }

    public static passwordEncryption(password: string, salt: string): string {
        const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        const passwordHash = hash.digest('hex');
        return passwordHash;
    }

    public static generateString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
