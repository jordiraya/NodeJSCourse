const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var result = isRealString(1);
        expect(result).toBe(false);
    });

    it('should reject string only spaces', () => {
        var result = isRealString('   ');
        expect(result).toBe(false);
    });  

    it('should allow string with non-space characters', () => {
        var result = isRealString('Pepe');
        expect(result).toBe(true);
    });      
});