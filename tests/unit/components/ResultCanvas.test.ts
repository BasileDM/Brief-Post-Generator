import { describe, it, expect } from 'vitest';
import { getLines } from './../../../src/utils/getLines'; 


const fakeCanvasContext = {
  measureText: (text: string) => {
    return { width: text.length * 10 };
  },
};

describe('getLines', () => {
  it('devrait retourner un tableau avec une seule ligne si le slogan tient dans la largeur max', () => {
    const slogan = "Hello world";
    const result = getLines(fakeCanvasContext as CanvasRenderingContext2D, slogan);
    expect(result).toEqual(["Hello world"]);
  });

  it('devrait découper le slogan en plusieurs lignes quand la largeur dépasse la largeur max', () => {
    const slogan = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    const result = getLines(fakeCanvasContext as CanvasRenderingContext2D, slogan, 400);
    expect(result).toEqual(["Lorem ipsum dolor sit amet, consectetur", "adipiscing elit"]);
  });

  it('devrait retourner un tableau avec une chaîne vide si le slogan est vide', () => {
    const slogan = "";
    const result = getLines(fakeCanvasContext as CanvasRenderingContext2D, slogan);
    expect(result).toEqual([""]);
  });
});
