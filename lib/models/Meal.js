class Meal {
  constructor(attrs) {
    this.name = attrs.name;
    this.foods = attrs.foods;
    this.totalCalories = 0;
    this.remainingCalories = 400;
  }

  addFood(food) {
    this.foods.push(food);
    this.addCalories(food.calories);
  }

  removeFood(food) {

  }

  addCalories(calories) {
    this.totalCalories += calories;
    this.remainingCalories -= calories;
  }

  removeCalories(calories) {

  }
}

module.exports = Meal
