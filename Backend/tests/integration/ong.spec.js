const request = require('supertest'); 
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

    });

    afterAll(async() => {
        await connection.destroy();
    });

    it('deve permitir criar uma nova ONG', async () => {
        const response = await request(app).post('/ongs')
        .send({
        	nome: "Ong Teste Infinito",
	        email: "contato@contato.com",
	        whatsapp: "3899999999",
	        cidade: "Montes Claros",
	        uf: "MG"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});