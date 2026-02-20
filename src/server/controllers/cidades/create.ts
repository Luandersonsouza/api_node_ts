import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';

interface Cidade {
    nome: string;
    estado: string;
}

interface Filter{
    filter?: string | undefined;
}
// Isso aqui é um middleware, ele é chamado antes do create e validará o corpo da
//  requisição antes de "liberar" o create para ser executado.

export const createValidation = validation((getSchema) => ({
    body: getSchema<Cidade>(yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(2).max(2),
    })),
    query: getSchema<Filter>(yup.object().shape({
        filter: yup.string().optional().min(3),
    })),
}));

// Já aqui é o create em si, ele só será executado se o createBodyValidator obtiver sucesso no seu 'try'
//  e chamar o 'next()'; Ou seja, no meu arquivo de rotas, na minha rota '/cidades', terei o createBodyValidator
//  como um middleware, e então o create como handler da rota.

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {

  console.log(req.body);

  return res.send('Criado!');
};
