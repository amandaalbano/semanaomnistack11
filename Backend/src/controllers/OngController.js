const crypto = require('crypto');
const generateUniqueId = require ('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create (request, response){
        const {nome, email, whatsapp, cidade, uf} = request.body;
    const id = generateUniqueId();

    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        cidade,
        uf,
    })

    return response.json({id});
    }
};