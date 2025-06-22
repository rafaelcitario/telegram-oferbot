export function randomInt ( min: number, max: number ) {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

export function gerarCupom () {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let cupom = '';
    for ( let i = 0; i < 6; i++ ) {
        cupom += caracteres.charAt( Math.floor( Math.random() * caracteres.length ) );
    }
    return cupom + 'AF';
}
