import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';



const querySchema = yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
});

type QueryProps = yup.InferType<typeof querySchema>;

export const getAllValidation = validation((getSchema) => {

    return {
        query: getSchema<QueryProps>(querySchema),
    };

    
});

export const getAll = async (
    req: Request<{}, {}, {}, QueryProps>,
    res: Response
) => {

  return res.status(StatusCodes.OK).json([]);
};
