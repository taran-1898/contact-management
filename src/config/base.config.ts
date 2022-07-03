import { LoggerOptions } from '@adhityan/gc-logger';
import { APP_NAME } from '../constants';

export abstract class BaseConfig {

    /**
     * This key is used in generating session token
     */
    public PORT: number = parseInt(process.env.PORT || '9000', 10);

    public HOST: string = process.env.HOST || `localhost:${this.PORT}`

    /**
     * Configuration setting for the GC Logger
     */
    public LOGGER_CONFIG: LoggerOptions = {
        fileLoggerEnabled: false,
        serviceName: APP_NAME,
    };

    /**
     * Container name in K8
     */
    public CONTAINER_NAME = process.env.CONTAINER_NAME || 'contact-management';

    /**
     * MySQL DB Host
     */
    public DB_HOST: string = process.env.DB_HOST || '';

    /**
     * MySQL DB Port
     */
    public DB_PORT: number = parseInt(process.env.DB_PORT || '3306', 10);

    /**
     * MySQL DB Username
     */
    public DB_USERNAME: string = process.env.DB_USERNAME || 'taran';

    /**
     * MySQL DB Password
     */
    public DB_PASSWORD: string = process.env.DB_PASSWORD || 'root';

    /**
     * MySQL DB Database
     */
    public DB_DATABASE: string = process.env.DB_DATABASE || 'contact-management';

    /**
     * Database table prefix
     */
    public DB_TABLE_PREFIX: string = process.env.DB_TABLE_PREFIX || '';

    /**
     * type orm synchronize flag
     */
    public DB_SYNCHRONIZE: boolean;

    /**
     * Sendgrid api key for sending emails
     */
    public SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY || ''

    /**
     * Sender email id
     */
    public SENDER_MAIL: string = process.env.SENDER_MAIL || ''

    public RSA_PRIVATE_KEY: string = process.env.RSA_PRIVATE_KEY ||
        `-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAMcb8kb9+odx9lweIThay8s7fkbgZxXNRW0pWMpx2tWFQk6mXJBU
yMHhsXXsLa/Xo7bEj0HDJYqiacrVQ/bLz98CAwEAAQJADy51Ua5p3Mv2sd1mQQrD
QTK/FR5lHcdyBLnDWGRIAEGvRW6/agSH3T1G820oi9XT6UOEkqAmxXxB7qtdHoPU
6QIhAPs4q7QaPuQWRDaYO1ylAYPaxuTuyL3rVpu+1851yTVFAiEAyuWDje+Ocfn9
rnh0AdB3J9i9yfo1m29k1dZwVELryNMCICk4HiwZ1lHUOXL/vVWxGTOKNPIhH7zR
nU9Gm+AbQV1FAiBfRG0E1BqaQbtvlHdD8tJAD3DtyWIqXZ+HGG0d4146qQIgZERK
7It7jTKuMpxBgl0mC0Le4yv4yiALdaIwqMtpYTM=
-----END RSA PRIVATE KEY-----`

}
