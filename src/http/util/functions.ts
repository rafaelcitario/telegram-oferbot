import path from 'path';
import https from 'node:https';
import fs from 'node:fs';

export function randomInt ( min: number, max: number ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

export function escapeMarkdown ( text: string ) {
    return text
        .replace( /[+.!\\-]/g, '\\$&' );
}

export function gerarCupom () {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let cupom = '';
    for ( let i = 0; i < 6; i++ ) {
        cupom += caracteres.charAt( Math.floor( Math.random() * caracteres.length ) );
    }
    return cupom + 'AF';
}

export function getAssetPath ( filename: string ) {
    return path.join( __dirname, '..', '..', '..', 'assets', filename );
}

export function delay ( ms: number ) {
    return new Promise( resolve => setTimeout( resolve, ms ) );
}

export function downloadFiles ( url: string, path: string ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
        https.get( url, ( res ) => {
            if ( !res || res.statusCode! < 200 || res.statusCode! > 299 ) {
                return reject( new Error( 'Erro ao fazer o download. Código: ' + res.statusCode ) );
            }

            const fileStream = fs.createWriteStream( path );
            res.pipe( fileStream );

            fileStream.on( 'finish', () => {
                fileStream.close( () => {
                    console.log( '✅ Download finalizado!' );
                    resolve();
                } );
            } );

            fileStream.on( 'error', ( err ) => {
                fs.unlink( path, () => reject( err ) );
            } );
        } ).on( 'error', reject );
    } );
}
