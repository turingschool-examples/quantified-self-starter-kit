class Meal {
  constructor(name, foods, id=null)
  {
    this.name = name
    this.foods = foods
    if (id) {
      this.id = id
    }
  }
}

export { Meal }
