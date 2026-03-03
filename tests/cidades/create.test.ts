import { StatusCodes } from 'http-status-codes';
import { testServidor } from '../jest.setup';

describe('Cidade - Create', () => {

    it('Cria registro', async ()=>{

        const response = await testServidor

        .post('/cidades')
        .send({
            nome: 'Maceio'
        });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect( typeof response.body).toEqual('number');

    });

    it('Tenta criar um registro com nome muito curto', async ()=>{

        const response = await testServidor

        .post('/cidades')
        .send({nome:'Ma'});

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.nome');

    });
});