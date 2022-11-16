import { HTTPError } from './error';
describe('Given', () => {
    let error;
    beforeEach(() => {
        error = new HTTPError(418, 'che', 'hola');
    });
    test('should first', () => {
        expect(error).toBeInstanceOf(Error);
    });
});
