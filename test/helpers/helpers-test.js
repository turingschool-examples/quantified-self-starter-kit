const assert = require('chai').assert
const {remainingCalSign} = require('../../lib/helpers/helpers.js')

describe('.remainingCalSign()', () => {
  context('when number is greater than or equal to Zero', () => {
    it('it returns "positive"', () =>{
      assert.equal(remainingCalSign(1), 'positive');
    });
  });

  context('when number is below zero', () => {
    it('it returns "negative"', () =>{
      assert.equal(remainingCalSign(-1), 'positive');
    });
  });
});
