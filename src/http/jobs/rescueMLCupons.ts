import path from 'path';
import { bot, group_id } from '../lib/bot';

function howToRescueMLCupons () {
    const message = `
🧓🏼 *Seu Alfredo te dá uma ajudinha, tá?*

Aprenda direitinho *como resgatar os cupons no Mercado Livre* 🛍️

🎬 _Preparei um pequeno guia em forma de GIF pra te ensinar, com muito carinho, como encontrar e ativar seus cupons no site do Mercado Livre\\!_

Se preferir, você também pode assistir clicando 👉 [**AQUI**](https://http2.mlstatic.com/frontend-assets/affiliates-site/search-coupon-v3.gif)

💡 _Lembre\\-se:_ essas ofertas são como pão quentinho… saem rapidinho\\! Aproveite enquanto ainda estão disponíveis, tá bom?
`.trim();


    const animationGif = path.join( process.cwd(), 'assets', 'ml_rescue_cupom.gif' );

    bot.telegram.sendAnimation(
        +group_id,
        { source: animationGif },
        { parse_mode: 'MarkdownV2', caption: message }
    ).then( () => {
        console.log( '✅ Gif de resgate enviado' );
    } ).catch( err => {
        console.error( '❌ Erro ao enviar gif de resgate:', err );
    } );
}

export function startTutorialMLRescue () {
    const minutos = 65;
    const intervaloMs = minutos * 60 * 1000;

    howToRescueMLCupons();
    setInterval( howToRescueMLCupons, intervaloMs );
    console.log( '🔔 Job de tutorial de resgate ML iniciado...' );
}
