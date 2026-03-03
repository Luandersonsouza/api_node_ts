import { StatusCodes } from 'http-status-codes';
import { testServidor } from '../jest.setup';

describe('Cidade - GetById', () => {

    it('Lista um registro', async ()=>{

        const responseCreate = await testServidor
            .post('/cidades')
            .send({ nome: 'Maceio'});
            
        expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED);

        const responseSearch = await testServidor
            .get(`/cidades/${responseCreate.body}`)
            .send();

        expect(responseSearch.statusCode).toEqual(StatusCodes.OK);
        expect(responseSearch.body).toHaveProperty('nome');
    });

    it('Tenta listar um registro que não existe', async ()=>{

        const response = await testServidor
            .get('/cidades/9999')
            .send();

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    });
});