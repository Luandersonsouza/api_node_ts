import { StatusCodes } from 'http-status-codes';
import { testServidor } from '../jest.setup';

describe('Cidade - Delete', () => {

    it('Deleta um registro', async ()=>{

        const response = await testServidor
            .post('/cidades')
            .send({nome:'Maceio'});
        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const responseDeletada = await testServidor
            .delete(`/cidades/${response.body}`)
            .send();
        expect(responseDeletada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta deletar um registro que não existe', async ()=>{

        const response = await testServidor
        .delete('/cidades/9999')
        .send();

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('erros.default');
    });
});