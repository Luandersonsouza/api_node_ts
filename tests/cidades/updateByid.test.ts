import { StatusCodes } from 'http-status-codes';
import { testServidor } from '../jest.setup';

describe('Cidade - Update', () => {

    it('Atualiza um registro', async ()=>{

        const responseCreate = await testServidor
            .post('/cidades')
            .send({nome:'Maceio'});

        expect(responseCreate.statusCode).toEqual(StatusCodes.CREATED);
  

        const responseUpdated = await testServidor
            .put(`/cidades/${responseCreate.body}`)
            .send({nome:'Maceio'});
        
        expect(responseUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar um registro que não existe', async ()=>{

        const response = await testServidor
            .put('/cidades/9999')
            .send({nome:'Maceio'});

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    });
});