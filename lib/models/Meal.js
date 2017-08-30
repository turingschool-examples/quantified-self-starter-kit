/* @flow */

const Food       = require('./Food');
const MealsApi   = require('../apis/meals-api');
const HtmlHelper = require('../helpers/HtmlHelper');

class Meal {
  id: number;
  name: string;
  totalCalories: number;
  remainingCalories: number;
  foods: Array<Object>;

  constructor(attrs: Object) {
    this.id = attrs.id;
    this.name = attrs.name;
    this.totalCalories = 0;
    this.remainingCalories = this.getCalorieLimits(attrs.name);
    this.foods = [];

    this.buildFoods(attrs.foods);
  }

  getCalorieLimits(name: string): number {
    const limits: { [string]: number } = {
      "Breakfast": 400,
      "Snack": 200,
      "Lunch": 600,
      "Dinner": 800
    }
    return limits[name];
  }

  buildFoods(rawFoods: Object){
    rawFoods.forEach( (food) => {
      this.foods.push(new Food(food));
      this.addCalories(food.calories);
    });
  }

  addFood(food: Object) {
    return MealsApi.addFood(this.id, food.id)
      .then( () => {
        this.foods.push(food);
        this.addCalories(food.calories);
        return [HtmlHelper.foodRow(food), HtmlHelper.mealTableFooter(this)];
      });
  }

  findFood(food_id: number) {
    return this.foods.find( (food) => {
      return food.id == food_id;
    });
  }

  removeFood(food_id: number) {
    return MealsApi.removeFood(this.id, food_id)
      .then( () => this.findFood() )
      .then( (food) => {
        if (food) {
          this.foods.splice(this.foods.indexOf(food), 1);
          this.removeCalories(food.calories);
        }
      })
      .then( () => {
        return HtmlHelper.mealTableFooter(this);
      })
  }

  addCalories(calories: number) {
    this.totalCalories += calories;
    this.remainingCalories -= calories;
  }

  removeCalories(calories: number) {
    this.totalCalories -= calories;
    this.remainingCalories += calories;
  }
}

module.exports = Meal
