import { bot, group_id } from '../lib/bot';

function enviarMensagemCarrinho () {
    const incentivo = [
        '🧓🏼 Olha… eu se fosse você dava uma passadinha no seu carrinho. Tem umas coisinhas lá te esperando, e olha… tão com um preço que só vendo pra acreditar, viu?',
        '🌟 Não quero ser chato, mas deixa eu te lembrar com todo carinho… seu carrinho tá lá, te esperando quietinho. Vai que aquela oferta some, né? Economizar nunca fez mal pra ninguém\\!',
        '🛒 Oi… seu carrinho tá ali, guardando umas oportunidades que não aparecem todo dia não, viu? Dá uma olhadinha com carinho.',
        '✨ Sabe… quando eu tinha sua idade, me ensinavam que quem chega cedo bebe água limpa. Tem umas ofertas no seu carrinho que… olha… é pra não deixar escapar.',
        '🚚 Só passando aqui, com todo respeito e carinho, pra te avisar: o seu carrinho na Shopee tá lá, bonitinho, só te esperando. E essas ofertas… ah, essas não ficam pra sempre não\\!',
        '📦 Me permita te dizer, com toda educação… não deixa seu carrinho lá jogado não, viu? Tem desconto ali que, olha… até eu fiquei tentado\\!',
        '👴🏼 Fico aqui só imaginando… você esquecendo aquele carrinho cheio de coisa boa. Dá uma olhadinha lá, não custa, né?',
        '💌 Eu sei que a vida é corrida, viu? Mas só tô te lembrando com carinho… seu carrinho tá te esperando, cheio de oportunidade pra economizar um dinheirinho bom.',
        '🧳 Na minha época a gente fazia lista de mercado… hoje vocês têm carrinho virtual\\! E olha, o seu tá lá, cheio de oferta boa te esperando.',
        '📣 Com todo o respeito, meu jovem (ou minha jovem)… se eu fosse você dava uma espiada no carrinho. Essas promoções não costumam esperar muito não, viu?',
        '🎯 Só te falo uma coisa, e é de coração: carrinho cheio, bolso feliz. Vai lá, dá aquela conferida antes que as ofertas se despeçam de você.',
        '🚦 Ih… será que você esqueceu seu carrinho, hein? Só passei aqui pra te lembrar com carinho… vai que dá tempo de garantir aquele descontinho maroto\\!',
        '🧓🏼 Olha, eu não sou de me meter na vida dos outros, mas sabe… economizar é um gesto de amor consigo mesmo. Seu carrinho tá ali te esperando, viu?',
        '☕ Pronto, falei\\! Agora vou ali tomar meu café… mas antes te deixo esse recado: dá uma passadinha no seu carrinho. Depois não diz que o vovô Alfredo não avisou, hein?',
    ];


    const frase = incentivo[Math.floor( Math.random() * incentivo.length )];
    const linkCarrinho = 'https://shopee.com.br/cart/?utm_content=alfred_cart&utm_medium=affiliates&utm_source=an_18395090622';

    const mensagem = `
${frase}

👉 [**Dá uma olhadinha no seu carrinho aqui, viu?**](${linkCarrinho})

⚠️ Com todo respeito, não deixa passar não… essas coisas somem rapidinho\\.
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
