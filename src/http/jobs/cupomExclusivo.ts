import path from 'path';
import { bot, group_id } from '../lib/bot';

export function sendExclusiveCupom () {
    bot.command( 'templatecpm', async ( ctx ) => ctx.reply( `\/cupom sh DESCONTAO25 Válido para compras acima de R$150\n\n\r\/cupom ml CUPOMVIP15 Somente para produtos selecionados` ) );
    bot.command( 'cupom', async ( ctx ) => {
        const textoRecebido = ctx.message.text.trim();
        const args = textoRecebido.split( ' ' ).slice( 1 );

        const cupomType = args[0]?.toLowerCase();
        const cupom = args[1]?.toUpperCase();
        const detalhes = args.slice( 2 ).join( ' ' ).replaceAll( '.', '\\.' ).replaceAll( '!', '\\!' ).trim();

        if ( !cupomType || !cupom || ( cupomType !== 'sh' && cupomType !== 'ml' ) ) {
            return ctx.reply(
                `🧓🏼 *Ih, meu jovem… acho que você esqueceu alguma coisa\\!*\n\n` +
                `O formato correto é:\n` +
                `\`/cupom sh|ml CUPOM Detalhes opcionais\`\n\n` +
                `Exemplo:\n` +
                `\`/cupom sh DESCONTAO25 Válido para compras acima de R$100\``,
                { parse_mode: 'MarkdownV2' }
            );
        }

        const loja = cupomType === 'sh' ? '🛍️ *SHOPEE*' : '🛒 *MERCADO LIVRE*';

        const legenda = `
🧓🏼 *\\+CUPOM EXCLUSIVO LIBERADO NO ${loja}*

🎟️ Anota aí, meu jovem: \`${cupom}\`

${detalhes ? `📝 ${detalhes}\n` : ''}

⚠️ _Mas corre, viu? Esse cupom é igual bolo quente na padaria… acaba rapidinho\\!_
        `.trim();

        const assetsPath = path.join( __dirname, '..', '..', '..', 'assets' );
        const banner = cupomType === 'sh' ? 'sh_exclusivo.png' : 'ml_exclusivo.png';
        const caminhoImagem = path.join( assetsPath, banner );

        try {
            await bot.telegram.sendPhoto(
                +group_id,
                { source: caminhoImagem },
                { caption: legenda, parse_mode: 'MarkdownV2' }
            );
            console.log( `✅ Cupom ${cupom} enviado com sucesso.` );
        } catch ( error ) {
            console.error( '❌ Erro ao enviar cupom:', error );
            ctx.reply( '⚠️ Tive um probleminha aqui pra enviar o cupom… tenta de novo mais tarde, tá?', { parse_mode: 'MarkdownV2' } );
        }
    } );
}
