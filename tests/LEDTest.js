import { expect } from 'chai';
import LED from '../src/LED';

describe('LED', () => {

  let led = new LED();

  describe('constructor', () => {

    it('should have a default color value', () => {
      expect(led.color).to.not.be.undefined;
    });

    it('default should be blue', () => {
      expect(led.color).to.equal("blue");
    });

  });

  describe('changeColor', () => {

    it('should change color', () => {
      led.changeColor("red");

      expect(led.color).to.equal("red");
    });

    it('should return to default on bad input', () => {
      led.changeColor("orange");

      expect(led.color).to.equal("blue");
    });

  });

});
