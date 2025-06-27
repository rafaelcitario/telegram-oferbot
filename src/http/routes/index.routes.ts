import { Request, Response, Router } from 'express';

const router = Router();
const botInfo = {
    name: 'alfredo',
    version: '4.0.0',
    createdBy: {
        name: "Rafael Citario",
        github: "https://github.com/rafaelcitario",
        linkedin: "https://linkedin.com/in/rafaelcitario"
    },
    commands: {
        template: '/templatecpm',
        cuponCustom: '/cupon <ml | sh> <...desc>',
    },
    extras: 'send links and promotions from a file.csv'

};
router.get( '/', ( req: Request, res: Response ) => {
    res.status( 200 ).jsonp( { ...botInfo } );
} );

export default router;