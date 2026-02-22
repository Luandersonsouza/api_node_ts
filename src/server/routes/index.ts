import {Router} from "express";

import {cidadesController} from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send({ message: 'Funcionando' });
});

//Criação das rotas de cidades
router.post('/cidades',
   cidadesController.createValidation,
   cidadesController.create);

//Pega sem filtro cidades
router.get('/cidades',
   cidadesController.getAllValidation,
   cidadesController.getAll);

//Pega cidades com filtro de ID
router.get('/cidades/:id',
   cidadesController.getByIdValidation,
   cidadesController.getByid);

//Atualiza cidades com filtro de ID   
router.put('/cidades/:id',
   cidadesController.updateByIdValidation,
   cidadesController.updateByid);

//Deleta cidades com filtro de ID   
router.delete('/cidades/:id',
   cidadesController.deleteByIdValidation,
   cidadesController.deleteByid);
export { router };