import { Request, Response, Router } from 'express';

const router = Router();
const botInfo = {
    name: 'alfredo',
    version: '0.0.1',
    createdBy: {
        name: "Rafael Citario",
        github: "https://github.com/rafaelcitario",
        linkedin: "https://linkedin.com/in/rafaelcitario"
    }

};
router.get( '/', ( req: Request, res: Response ) => {
    res.status( 200 ).jsonp( { ...botInfo } );
} );

export default router;