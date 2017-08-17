const assert = require('chai').assert
const food = require('../lib/Food.js')

describe('Food', () => {
  context('when created', () => {
    it('it is a food', () => {
      const myFood = new food({name: "Test", calories: 100})
      assert.instanceOf(myFood, food)
    })

    it('it has a name', () => {
      const myFood = new food({name: "Test", calories: 100})
      assert.equal(myFood.name, "Test")
    })

    it('it has calories', () => {
      const myFood = new food({name: "Test", calories: 100})
      assert.equal(myFood.calories, 100)
    })
  })
})
