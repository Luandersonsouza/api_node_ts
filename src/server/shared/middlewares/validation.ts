import { RequestHandler } from 'express';
import { Schema, ValidationError } from 'yup';
import { StatusCodes } from 'http-status-codes';

type tProperty = 'body' | 'header' | 'params' | 'query';

type tGetSchema = <T>(schema: Schema<T>) => Schema<T>

type tAllSchemas = Record<tProperty, Schema<any>>;

type tGetAllSchemas = (getSchema: tGetSchema) => Partial<tAllSchemas>;

type tValidation = (getAllSchemas: tGetAllSchemas) => RequestHandler;

export const  validation: tValidation = (getAllSchemas) => async (req, res, next) => {

    const schemas = getAllSchemas((schema) => schema);

    const errosResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {

        try{
            schema.validateSync(req[key as tProperty], {abortEarly: false});
        }
        catch (err) {
    
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};
    
            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                errors[error.path] = error.message;
            });

            errosResult[key] = errors;
            
        
        }

    });

    if (Object.entries(errosResult).length === 0) {
        return next();
    } else{
        return res.status(StatusCodes.BAD_REQUEST).json({errors: errosResult});
    }

    

}
