class Menu {
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

  addCalories(calories) {
    this.totalCalories += food.calories;
    this.remainingCalories -= food.calories;
  }
}

module.exports = Menu
