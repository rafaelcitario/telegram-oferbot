import { bot, group_id } from '../lib/bot';
import { message } from 'telegraf/filters';
import fs from 'node:fs';
import path from 'node:path';
import { delay, downloadFiles, escapeMarkdown } from '../util/functions';
import { randomUUID } from 'node:crypto';
import { Context } from 'telegraf';

let csvQueue: string[][] = [];

export function envioListaCSV () {
    bot.on( message( 'document' ), async ( ctx ) => {
        const file_id = ctx.message.document.file_id;
        const fileLink = ( await ctx.telegram.getFileLink( file_id ) ).toString();

        if ( !fileLink.endsWith( '.csv' ) ) {
            await ctx.replyWithAnimation( 'CgACAgIAAxkBAAPOaFzLVuDzx763BuejHJGOpj7TnmkAAh4RAAJBGklIzCMNbI5ipWs2BA' );
            return;
        }

        const folder = path.join( __dirname, '..', '..', '..', 'assets' );
        const files = fs.readdirSync( folder ).filter( f => f.endsWith( '.csv' ) );
        files.forEach( f => fs.unlinkSync( path.join( folder, f ) ) );


        const filePath = path.join( folder, `${randomUUID()}.csv` );
        await downloadFiles( fileLink, filePath );

        const csv = await readCSV( filePath );
        if ( !csv || csv.length <= 1 ) {
            await ctx.reply( '❌ Nenhum dado encontrado no CSV.' );
            return;
        }

        csvQueue = csv.slice( 1 );
        await ctx.reply( `✅ Arquivo recebido! O Vovô Alfredo vai enviar ${csvQueue.length} ofertas a cada 4 horas.` );

        if ( !jobStarted ) {
            startCsvJob();
        }
    } );
}

let jobStarted = false;

function startCsvJob () {
    jobStarted = true;

    const intervalMs = 4 * 60 * 60 * 1000; // 4 horas

    const sendNext = async () => {
        if ( csvQueue.length === 0 ) {
            console.log( '✅ Fila CSV vazia. Job parado.' );
            jobStarted = false;
            return;
        }

        const row = csvQueue.shift();
        if ( !row ) return;

        const title = row[1]?.trim() || 'Produto sem título';
        const originalPrice = parseFloat( row[2]?.replace( /"/g, '' ).replace( ',', '.' ) || '0' );
        const sold = row[3]?.trim() || '0';
        const link = row[8]?.trim() || '';

        if ( isNaN( originalPrice ) ) {
            console.warn( 'Linha ignorada: preço inválido.' );
            sendNext();
            return;
        }

        const message = `🧓🏼 *Olha só que achado, meu jovem…*\n\n*${title}*\n\n~De R$${( originalPrice + originalPrice * .4 ).toFixed( 2 )}~\n*Por apenas R$${originalPrice.toFixed( 2 )}* 💸\n\nJá foram vendidas mais de *${sold}* unidades!\n\n_E não é à toa… é coisa boa, de verdade, viu?_\n\n✨ *Aproveita enquanto ainda dá tempo!* \n👉 ${link}`.trim();

        const animation = 'CgACAgQAAxkBAAP0aF3Gifo8cgAByf3nuTGMKTyWZ1GOAAKkBAACRGD9Ut0AASQIQrmUDDYE';
        await bot.telegram.sendAnimation( group_id, animation, {
            caption: escapeMarkdown( message ),
            parse_mode: 'MarkdownV2',
        } );

        console.log( `✅ Linha enviada, próximas em ${intervalMs / 3600000}h.` );

        setTimeout( sendNext, intervalMs );
    };

    sendNext();
}

async function readCSV ( filePath: string ): Promise<string[][] | undefined> {
    if ( !fs.existsSync( filePath ) ) return;

    const lines = fs.readFileSync( filePath, 'utf-8' )
        .split( '\n' )
        .filter( line => line.trim() );

    return lines.map( line => {
        const converted = line.replace( /"R?\$?(\d+),(\d+)"/g, ( _, int, dec ) => `"${int}.${dec}"` );
        return converted.split( ',' );
    } );
}
