import { NoImagePipe } from "./no-image.pipe";

describe('NoImagePipe', () => {

    let pipe: NoImagePipe;

    beforeEach( () => {
        pipe = new NoImagePipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('transform', () => {
        const text = 'Cadena sin http';
        const newText = pipe.transform(text);
        expect(newText).toEqual('https://static.thenounproject.com/png/4209386-200.png');

        const text1 = 'https://url-valida';
        const newText1 = pipe.transform(text1);
        expect(newText1).toEqual(text1);
    });
});
