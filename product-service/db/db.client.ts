import {Pool, PoolConfig} from 'pg';

const {PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD} = process.env;

const PG_PORT_number: number = Number(PG_PORT);

const dbOptions: PoolConfig = {
    host: PG_HOST,
    port: PG_PORT_number,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
}

let pool

const connectDB = async () => {
    if (!pool) {
        pool = new Pool(dbOptions);
    }
    return await pool.connect();
}

export async function executeQuery<T>(query: string): Promise<T> {
    const client = await connectDB();
    let result: T;
    try {
        result = (await client.query(query)).rows;
    } catch (e) {
        throw new Error(`Error executing query: ${query}, \n error: ${e}`);
    } finally {
        client.release();
    }
    return result;
}
