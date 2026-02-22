import * as create  from './create';
import * as getAll from './getAll';
import * as getByid from './getByid';
import * as updateByid from './updateByid';
import * as deleteByid from './deleteByid';

export const cidadesController = {

    ...create,
    ...getAll,
    ...getByid,
    ...deleteByid,
    ...updateByid,
};

