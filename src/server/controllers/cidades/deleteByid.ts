import { Request, Response } from 'express';
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

type ParamsProps = yup.InferType<typeof paramsSchema>;

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<ParamsProps>(paramsSchema),
}));

export const deleteByid = async (
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

    return res.status(StatusCodes.NO_CONTENT).send();
};