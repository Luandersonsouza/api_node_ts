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

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<ParamsProps>(paramsSchema),
}));

export const getByid = async (
    req: Request<{id: string}>,
    res: Response
) => {

    //teste para simular dados mockados
    if(Number(req.params.id) === 9999)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Registro não encontrado'
            }
        });
    return res.status(StatusCodes.OK).json({

        id: Number(req.params.id),
        nome: 'Maceio',
    });
};