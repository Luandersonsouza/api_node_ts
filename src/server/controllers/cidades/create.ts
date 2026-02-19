import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface Cidade {
    nome: string;
    estado: string;
}

const bodyValidation: yup.Schema <Cidade> = yup.object().shape({

    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2).max(2),

});

// Isso aqui é um middleware, ele é chamado antes do create e validará o corpo da
//  requisição antes de "liberar" o create para ser executado.

export const createBodyValidator: RequestHandler = async ( req, res, next) => {
    try{
        await bodyValidation.validate(req.body, {abortEarly: false});
        return next();
    }
    catch (err) {

        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        });
        
        return res.status(StatusCodes.BAD_REQUEST).json({errors});
    }
};

// Já aqui é o create em si, ele só será executado se o createBodyValidator obtiver sucesso no seu 'try'
//  e chamar o 'next()'; Ou seja, no meu arquivo de rotas, na minha rota '/cidades', terei o createBodyValidator
//  como um middleware, e então o create como handler da rota.

export const create: RequestHandler = async (req: Request<{}, {}, Cidade>, res: Response) => {

  console.log(req.body);

  return res.send('Criado!');
};