const assert = require('chai').assert
const menu = require('../lib/Menu.js')

describe('Menu', () => {
  context('when created', () => {
    it('it is a menu', () => {
      const myMenu = new menu({name: "Breakfast", foods: []})
      assert.instanceOf(myMenu, menu);
    })

    it('it has a name', () => {
      const myFood = new food({name: "Test", calories: 100})
      assert.equal(myFood.name, "Test")
    })

    it('it has foods', () => {
      const myFood = new food({name: "Test", calories: 100})
      assert.equal(myFood.calories, 100)
    })

    it('it has a remainingCalories', () => {
      const myFood = new food({name: "Test", calories: 100})
      assert.equal(myFood.name, "Test")
    })

    it('it has totalCalories', () => {
      const myFood = new food({name: "Test", calories: 100})
      assert.equal(myFood.calories, 100)
    })


  })
})
