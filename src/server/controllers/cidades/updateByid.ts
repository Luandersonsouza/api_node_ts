import {Request, Response} from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

const paramsSchema = yup.object().shape({
    id: yup
    .number()
    .required()
    .integer()
    .moreThan(0),
});

const bodySchema = yup.object().shape({
    nome: yup
    .string()
    .required()
    .min(3),
});

type ParamsProps = yup.InferType<typeof paramsSchema>;
type BodyProps = yup.InferType<typeof bodySchema>;

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<ParamsProps>(paramsSchema),
    body: getSchema<BodyProps>(bodySchema),
}));

export const updateByid = async (
    req: Request<{id: string}>,
    res: Response
) => { 

    //Dados mockados
    if(Number(req.params.id) === 9999) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Registro não encontrado.'}
        });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
};