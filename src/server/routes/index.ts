import {Router} from "express";

import {cidadesController} from './../controllers';

const router = Router();
router.get('/', (_, res) => {
  return res.send({ message: 'Funcionando' });
});

router.post('/cidades', cidadesController.createBodyValidator, cidadesController.create);

export { router };