const assert = require('chai').assert
const Food = require('../../lib/models/food')

describe('Food', function() {
  context('when created', function() {
    it('it is a food', function() {
      const myFood = new Food({name: "apple", calories: 150})
      assert.instanceOf(myFood, Food)
    })

    it('it has a name', function() {
      const myFood = new Food({name: "apple", calories: 150})
      assert.equal(myFood.name, "apple")
    })

    it('it has calories', function() {
      const myFood = new Food({name: "apple", calories: 150})
      assert.equal(myFood.calories, 150)
    })
  })
})
