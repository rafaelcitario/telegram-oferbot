import { Telegraf } from 'telegraf';
import 'dotenv/config';

if ( !process.env.BOT_TOKEN || !process.env.GROUP_ID ) {
    throw new Error( 'Invalid environment variable' );
}

export const group_id = process.env.GROUP_ID;
export const bot = new Telegraf( process.env.BOT_TOKEN );
