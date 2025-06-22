import { bot, group_id } from '../lib/bot';
import { gerarCupom, randomInt } from '../util/functions';


const categorias = [
    { id: 18, nome: 'Computadores e Acessórios' },
    { id: 28, nome: 'Moda Masculina' },
    { id: 3, nome: 'Moda Feminina' },
    { id: 35, nome: 'Mercado e Pets' },
    { id: 20, nome: 'Casa e Cozinha' },
    { id: 13, nome: 'Brinquedos' },
    { id: 11, nome: 'Beleza e Cuidado Pessoal' },
    { id: 5, nome: 'Eletrônicos' },
    { id: 10, nome: 'Cuidados para o Bebê' },
    { id: 4, nome: 'Livros e Papelaria' },
    { id: 47, nome: 'Celulares e Dispositivos' },
    { id: 9, nome: 'Auto e Moto' },
    { id: 7, nome: 'Esportes e Lazer' },
    { id: 2, nome: 'Ofertas Locais' },
];

function enviarMensagem () {
    const categoria = categorias[Math.floor( Math.random() * categorias.length )];
    const desconto = randomInt( 50, 80 );
    const cupom = gerarCupom();
    const link = `https://shopee.com.br/flash_sale?categoryId=${categoria.id}`
        .concat( '&utm_content=alfredo_bot&utm_medium=affiliates&utm_source=an_18395090622' );

    const mensagem = `
🚀 *OFERTA RELÂMPAGO NA SHOPEE* 🚀

💰 Até *${desconto}\\% OFF* em *${categoria.nome}*

🔗 [👉 ACESSE AQUI AGORA 👈](${link})
🎟️ *CUPOM:* \`${cupom}\`
⚠️ Estoque limitado\\. Corra antes que acabe\\!
`;

    bot.telegram.sendMessage( +group_id, mensagem, { parse_mode: 'MarkdownV2' } )
        .then( async ( response ) => {
            console.log( '✅ Oferta enviada' );
        } )
        .catch( err => console.error( '❌ Erro ao enviar oferta:', err ) );
}

export function startOfertaJob () {
    const horas = 2;
    const intervaloMs = horas * 60 * 60 * 1000;

    enviarMensagem();
    setInterval( enviarMensagem, intervaloMs );
    console.log( '🔔 Job de ofertas iniciado...' );
}
