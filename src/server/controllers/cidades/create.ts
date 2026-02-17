import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface Cidade {
    nome: string;
}

const bodyValidation: yup.Schema <Cidade> = yup.object().shape({

    nome: yup.string().required('O campo nome é obrigatório!').min(3, 'O campo nome deve conter no mínimo 3 caracteres!'),

});

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {
let validatedData: Cidade |  undefined = undefined;

    try{
        validatedData = await bodyValidation.validate(req.body);
    }
    catch (err) {

        const yupError = err as yup.ValidationError;
        
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: yupError.message,
            }
        })
    }
  console.log(validatedData);

  return res.send('Criado!');
}