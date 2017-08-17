const assert = require('chai').assert
const Food = require('../lib/Food.js')

describe('Food', () => {
  context('when created', () => {
    it('it is a food', () => {
      const myFood = new Food({name: "Test", calories: 100})
      assert.instanceOf(myFood, Food)
    })

    it('it has a name', () => {
      const myFood = new Food({name: "Test", calories: 100})
      assert.equal(myFood.name, "Test")
    })

    it('it has calories', () => {
      const myFood = new Food({name: "Test", calories: 100})
      assert.equal(myFood.calories, 100)
    })
  })
})
