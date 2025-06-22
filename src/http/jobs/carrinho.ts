import { bot, group_id } from '../lib/bot';

function enviarMensagemCarrinho () {
    const incentivo = [
        '🛒 Seu carrinho está esperando por você\\!',
        '🔥 Corre, que os descontos estão te esperando no carrinho\\!',
        '💥 Não deixe suas ofertas escaparem, finalize sua compra\\!',
        '🚚 Produtos incríveis te aguardam no carrinho\\!',
        '🎯 Aproveite agora\\! Seu carrinho tá te chamando\\!',
    ];

    const frase = incentivo[Math.floor( Math.random() * incentivo.length )];
    const linkCarrinho = 'https://shopee.com.br/cart/?utm_content=alfred_cart&utm_medium=affiliates&utm_source=an_18395090622';

    const mensagem = `
${frase}

👉 [**ACESSE SEU CARRINHO AGORA**](${linkCarrinho})

⚠️ Não marque bobeira\\. Estoque limitado e os preços podem subir\\!
`;

    bot.telegram.sendMessage( +group_id, mensagem, { parse_mode: 'MarkdownV2' } )
        .then( async ( response ) => {
            console.log( '✅ Mensagem do carrinho enviada' );
        } )
        .catch( err => console.error( '❌ Erro ao enviar mensagem do carrinho:', err ) );
}

export function startCarrinhoJob () {
    const minutos = 90;
    const intervaloMs = minutos * 60 * 1000;

    enviarMensagemCarrinho();
    setInterval( enviarMensagemCarrinho, intervaloMs );
    console.log( '🔔 Job do carrinho iniciado...' );
}
