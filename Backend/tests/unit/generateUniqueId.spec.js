const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('gererate unique ID', () => {
    it('deve gerar um ID único', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});