import path from 'path';
import { bot, group_id } from '../lib/bot';
import { gerarCupom, getAssetPath, randomInt } from '../util/functions';

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

function gerarMensagem ( categoria: any, desconto: number, cupom: string, link: string ) {
    const modelos = [
        `🚀 *OFERTA RELÂMPAGO NA SHOPEE* 🚀\n\n💰 Até *${desconto}\\% OFF* em *${categoria.nome}*\n\n🔗 [👉 ACESSE AQUI 👈](${link})\n🎟️ CUPOM: \`${cupom}\`\n⚠️ Corre antes que acabe\\!`,
        `🧓🏼 Olha só… Seu Alfredo achou um baita desconto em *${categoria.nome}*\\! Até *${desconto}\\% OFF*.\n\n🔗 [👉 Dá uma olhada aqui 👈](${link})\n🎟️ Cupom: \`${cupom}\`\n⚠️ Não deixa passar, viu?`,
        `🌟 Oferta especial do vovô Alfredo\\! *${desconto}\\% OFF* em *${categoria.nome}*.\n\n🔗 [👉 Vem ver 👈](${link})\n🎟️ Usa o cupom: \`${cupom}\`\n⚠️ É só por pouco tempo\\!`,
    ];
    return modelos[Math.floor( Math.random() * modelos.length )];
}

function enviarMensagem () {
    const categoria = categorias[Math.floor( Math.random() * categorias.length )];
    const desconto = randomInt( 50, 80 );
    const cupom = gerarCupom();
    const link = `https://shopee.com.br/flash_sale?categoryId=${categoria.id}`
        .concat( '&utm_content=alfredo_bot&utm_medium=affiliates&utm_source=an_18395090622' );

    const mensagem = gerarMensagem( categoria, desconto, cupom, link );

    const chanceComBanner = Math.random() < 0.6;

    if ( chanceComBanner ) {
        const caminhoBanner = getAssetPath( 'shopee_banner.jpg' );
        bot.telegram.sendPhoto(
            +group_id,
            { source: caminhoBanner },
            { caption: mensagem, parse_mode: 'MarkdownV2' }
        )
            .then( () => console.log( '✅ Oferta enviada com banner' ) )
            .catch( err => console.error( '❌ Erro ao enviar oferta com banner:', err ) );
    } else {
        bot.telegram.sendMessage(
            +group_id,
            mensagem,
            { parse_mode: 'MarkdownV2' }
        )
            .then( () => console.log( '✅ Oferta enviada sem banner' ) )
            .catch( err => console.error( '❌ Erro ao enviar oferta sem banner:', err ) );
    }
}

export function startOfertaJob () {
    const horas = 2;
    const intervaloMs = horas * 60 * 60 * 1000;

    enviarMensagem();
    setInterval( enviarMensagem, intervaloMs );
    console.log( '🔔 Job de ofertas iniciado...' );
}
