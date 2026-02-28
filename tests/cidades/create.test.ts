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


describe('Cidaede - GetAll', () => {

    it('Lista os registros', async ()=>{

        const response = await testServidor

        .get('/cidades');

        expect(response.statusCode).toEqual(StatusCodes.OK)
        expect(Array.isArray(response.body)).toBeTruthy();
    });

});

describe('Cidade - GetById', () => {

    it('Lista um registro', async ()=>{
        const response = await testServidor
        .get('/cidades/1');

        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toHaveProperty('id');
    });

    it('Tenta listar um registro que não existe', async ()=>{
        const response = await testServidor
        .get('/cidades/9999');
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });
});

describe('Cidade - Update', () => {

    it('Atualiza um registro', async ()=>{
        const response = await testServidor
        .put('/cidades/1')
        .send({nome:'Maceio'});
        
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toHaveProperty('id');
    });
});

describe('Cidade - Delete', () => {

    it('Deleta um registro', async ()=>{
        const response = await testServidor
        .delete('/cidades/1');
        expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta deletar um registro que não existe', async ()=>{
        const response = await testServidor
        .delete('/cidades/9999');
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });
});