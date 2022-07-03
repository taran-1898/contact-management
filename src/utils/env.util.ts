import { createConnection as createMysqlConnection } from 'mysql2/promise';
import { createConnection } from 'typeorm';

import { Config } from '../config';
import { ObjectUtils } from './object.util';
import { Entities } from '../orm';

export const isDebug = (): boolean => {
    if (process.env.NODE_ENV?.includes('PROD') || process.env.NODE_ENV?.includes('prod')) return false;
    return true;
};

/**
 * In dev environment create new database automatically
 */
const createDatabase = async (): Promise<void> => {
    const mysqlConnection = await createMysqlConnection({
        connectionLimit: 10,
        host: Config.DB_HOST,
        password: Config.DB_PASSWORD,
        port: Config.DB_PORT,
        user: Config.DB_USERNAME,
        waitForConnections: true,
    });

    try {
        await mysqlConnection.query(`CREATE DATABASE \`${Config.DB_DATABASE}\``);
        console.log(`New DB created with name \`${Config.DB_DATABASE}\`!`);
    } catch {
        // DO NOTHING
    } finally {
        mysqlConnection.destroy();
    }
};

/**
 * Initialize the SQLite connection
 */
export const initDatabase = async (): Promise<void> => {
    if (Config.DB_SYNCHRONIZE) await createDatabase();

    const entities = ObjectUtils.getObjectValues(Entities);

    console.log('Establishing database connection...');
    await createConnection({
        // charset: 'utf8mb4',
        database: Config.DB_DATABASE,
        entities,
        entityPrefix: Config.DB_TABLE_PREFIX,
        host: Config.DB_HOST,
        logging: isDebug() ? 'all' : ['error'],
        maxQueryExecutionTime: 1000,
        password: Config.DB_PASSWORD,
        port: Config.DB_PORT,
        synchronize: Config.DB_SYNCHRONIZE,
        type: 'mariadb',
        username: Config.DB_USERNAME,
    }).then(() => {
        console.log('Database connection success');
        return true;
    });
};
