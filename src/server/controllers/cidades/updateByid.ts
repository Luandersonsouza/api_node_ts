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
    const id = Number(req.params.id);

    const cidadeMock : Record<number, object> = {
        1: {id: 1, nome: 'Maceio'},
        2: {id: 2, nome: 'Recife'},
    };

    const cidade = cidadeMock[id];

    if (!cidade) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: { default: 'Registro não encontrado.'}
        });
    }
    
    return res.status(StatusCodes.OK).json({ ...cidade, nome: req.body.nome });
};