import { StatusCodes } from 'http-status-codes';
import { testServidor } from '../jest.setup';


describe('Cidaede - GetAll', () => {

    it('Lista os registros', async ()=>{


        const responseCriada = await testServidor
            .post('/cidades')
            .send({nome: 'Maceio'});
        expect(responseCriada.statusCode).toEqual(StatusCodes.CREATED);

        const responseBuscada = await testServidor
            .get('/cidades')
            .send();
        expect(Number(responseBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(responseBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(responseBuscada.body.length).toBeGreaterThan(0);
    });
});