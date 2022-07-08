import { config } from 'dotenv';
config();

export const HTTP_PORT: number = parseInt(process.env.HTTP_PORT as string);

export const MONGODB_SERVER: string = process.env.MONGODB_SERVER as string;
export const MONGODB_PORT: string = process.env.MONGODB_PORT as string;
export const MONGODB_USER: string = process.env.MONGODB_USER as string;
export const MONGODB_PASSWORD: string = process.env.MONGODB_PASSWORD as string;
export const MONGODB_DBNAME: string = process.env.MONGODB_DBNAME as string;
