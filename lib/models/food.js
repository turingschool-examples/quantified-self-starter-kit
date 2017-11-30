// If I visit foods.html, I should see a table of all my foods,
// with Name, Calories and a delete icon for each food

module.exports = class Food {
  constructor(name, calories) {
    this.name = name;
    this.calories = calories;
  }
}
