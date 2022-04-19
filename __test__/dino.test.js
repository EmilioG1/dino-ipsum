import AgeCalc from '../src/galactic.js';

describe('AgeCalc', () => {
  test('should return the inputted age on Earth', () => {
    const age = new AgeCalc(30);
    expect(age.earthAge).toEqual(30);
  });
});

describe(`Character`, () => {
  test(`It should create a wizard object.`, () => {
    const wizard = new Character("wizard");

    expect(wizard.damage).toEqual(70);
    expect(wizard.health).toEqual(250);
    expect(wizard.speed).toEqual(5);
  });
});