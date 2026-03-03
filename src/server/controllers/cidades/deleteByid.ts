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

//teste sem criar objeto mockado.
    if(Number(req.params.id) === 9999){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: { default: 'Registro não encontrado.'}
        });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
};