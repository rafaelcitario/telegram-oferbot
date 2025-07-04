import express from 'express';
import cors from 'cors';
import router from './http/routes/index.routes';
import { bot } from './http/lib/bot';
import 'dotenv/config';
import { startCarrinhoJob } from './http/jobs/carrinho';
import { startOfertaJob } from './http/jobs/ofertas';
import { startCupomJob } from './http/jobs/cupons';
import { sendExclusiveCupom } from './http/jobs/cupomExclusivo';
import { startTutorialMLRescue } from './http/jobs/rescueMLCupons';
import { envioListaCSV } from './http/jobs/files';

const app = express();
const PORT = process.env.PORT ? Number( process.env.PORT ) : 3000;


app.use( cors() );
app.use( express.json() );
app.use( router );

app.listen( PORT, () => {
    console.log( `🚀 Server rodando em http://localhost:${PORT}` );
} );

bot.launch()
    .then( () => console.log( '🤖 Bot do Telegram rodando...' ) )
    .catch( ( err ) => console.error( '❌ Erro ao iniciar o bot:', err ) );

startOfertaJob();
startCarrinhoJob();
startCupomJob();
sendExclusiveCupom();
startTutorialMLRescue();
envioListaCSV();


process.once( 'SIGINT', () => {
    console.log( '🛑 Encerrando com SIGINT...' );
    bot.stop( 'SIGINT' );
} );
process.once( 'SIGTERM', () => {
    console.log( '🛑 Encerrando com SIGTERM...' );
    bot.stop( 'SIGTERM' );
} );