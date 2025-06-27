import { bot, group_id } from '../lib/bot';
import { message } from 'telegraf/filters';
import fs from 'node:fs';
import os from 'node:os';

import path, { resolve } from 'node:path';
import { delay, downloadFiles, escapeMarkdown } from '../util/functions';
import child_process from 'node:child_process';
import { promisify } from 'node:util';
import { randomUUID } from 'node:crypto';
import { Context } from 'telegraf';

export async function envioListaCSV () {
    bot.on( message( 'animation' ), async ( ctx ) => {
        await ctx.reply( ctx.message.animation.file_id );
    } );

    bot.on( message( 'document' ), async ( ctx ) => {
        const file_id = ctx.message.document.file_id;
        const fileLink = ( await ctx.telegram.getFileLink( file_id ) ).toString();

        if ( !fileLink.endsWith( '.csv' ) ) {
            await ctx.replyWithAnimation(
                'CgACAgIAAxkBAAPOaFzLVuDzx763BuejHJGOpj7TnmkAAh4RAAJBGklIzCMNbI5ipWs2BA'
            );
            return;
        }

        const pathToSave = path.join(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            `${randomUUID()}.csv`
        );

        readCSV( [] );
        await downloadFiles( fileLink, pathToSave );

        const csv = await readCSV( [] );
        if ( !csv || csv.length <= 1 ) {
            await ctx.reply( 'Nenhum dado encontrado no CSV.' );
            return;
        }

        const animation = 'CgACAgQAAxkBAAP0aF3Gifo8cgAByf3nuTGMKTyWZ1GOAAKkBAACRGD9Ut0AASQIQrmUDDYE';
        const hours = 4;
        const delayMs = hours * 60 * 60 * 1000;

        for ( let i = 1, n = csv.length; i < n; i++ ) {
            const row = csv[i];

            const title = row[1]?.trim() || 'Produto sem título';
            const originalPrice = parseFloat(
                ( row[2] || '' ).replace( /"/g, '' ).replace( ',', '.' )
            );
            const priceDiscout = parseFloat(
                ( row[6] || '' ).replace( /"/g, '' ).replace( ',', '.' )
            );
            const sold = row[3]?.trim() || '';
            const link = row[8]?.trim() || '';

            if ( isNaN( originalPrice ) || isNaN( priceDiscout ) ) {
                console.warn( `Linha ${i} ignorada: preço inválido.` );
                continue;
            }

            const message = `🧓🏼 *Olha só que achado, meu jovem…*\n\n*${title}*\n\n~De R$${( originalPrice + 36.73 ).toFixed( 2 )}~\n*Por apenas R$${originalPrice.toFixed( 2 )}* 💸\n\nJá foram vendidas mais de * ${sold}* unidades!\n\n_E não é à toa… é coisa boa, de verdade, viu ? _\n\n✨ * Aproveita enquanto ainda dá tempo! *\n👉 ${link} \n`.trim();
            await ctx.telegram.sendAnimation( group_id, animation, {
                caption: escapeMarkdown( message ),
                parse_mode: 'MarkdownV2',
            } );

            console.log( `⏰ ${new Date().toISOString()} Enviando linha ${i}` );
            await delay( delayMs );

            if ( csv[i] == csv[n - 1] ) {
                csv.map( ( l, il ) => {
                    delete csv[il];
                    console.log( `⏰ ${new Date().toISOString()} Linha ${i} excluida de csv` );
                    csv.shift();
                } );
            }
        }
    } );
}

export async function readCSV ( memory: string[] ) {
    const pathFile = path.join( __dirname, '..', '..', '..', 'assets' );
    const csv = fs.readdirSync( pathFile ).filter( file => file.endsWith( '.csv' ) );
    if ( !csv[0] ) {
        console.log( '❌ Arquivo .csv não existe!' );
        return;
    }
    memory = [];
    const line = fs.readFileSync( path.join( pathFile, csv[0] ) )
        .toString()
        .split( '\n' )
        .filter( line => line != '' );

    memory = line;
    const exec = promisify( child_process.exec );

    try {
        let command;

        if ( os.type() === 'Linux' ) {
            command = 'rm -rf ./../../../assets/*.csv';
        } else {
            command = 'del assets\\*.csv';
        }

        const { stdout, stderr } = await exec( command );
        console.log( '✅ Arquivo(s) CSV excluído(s)!' );
        if ( stdout ) console.log( 'stdout:', stdout );
        if ( stderr ) console.log( 'stderr:', stderr );
    } catch ( err ) {
        console.error( '❌ Erro ao excluir CSV:', err );
    }

    if ( !csv[0] ) {
        console.log( '✅ Arquivo .csv excluido com sucesso!' );
        return;
    }

    let f: Array<string>[] = [];
    f = memory.map( line => {
        const convertido = line.replace( /"R?\$?(\d+),(\d+)"/g, ( _, int, dec ) => `"${int}.${dec}"` );
        return convertido.split( ',' );
    } );
    return f;
}



