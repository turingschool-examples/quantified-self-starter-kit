const assert     = require('chai').assert;
const Food       = require('../../lib/models/Food.js');
const HtmlHelper = require('../../lib/helpers/HtmlHelper');

describe('Food', () => {
  context('attributes', () => {
    it('it is a food', () => {
      const myFood = new Food({name: "Test", calories: 100});
      assert.instanceOf(myFood, Food);
    });

    it('it has a name', () => {
      const myFood = new Food({name: "Test", calories: 100});
      assert.equal(myFood.name, "Test");
    });

    it('it has calories', () => {
      const myFood = new Food({name: "Test", calories: 100});
      assert.equal(myFood.calories, 100);
    });
  });

  context('methods', () => {
    it('turns food object to HTML', () => {
      const deleteIcon = '../../vendor/assets/delete.png';
      const attrs = { id: 1, name: 'Tomato', calories: 200 };
      const food = new Food(attrs);
      const expectedHTML = `<tr class="food-row">` +
        `<td class="food-name" data-id="${attrs.id}">${attrs.name}</td>` +
        `<td class="food-calories number" data-id="${attrs.id}">${attrs.calories}</td>` +
        `<td><input type="image" src="${deleteIcon}" class="delete-food" data-id="${attrs.id}"/></td></tr>`

      const resultHTML = HtmlHelper.foodRow(food);

      assert.equal(resultHTML, expectedHTML)
    })
  })
})