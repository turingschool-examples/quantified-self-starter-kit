const assert    = require('chai').assert
const webdriver = require('selenium-webdriver');
const until     = webdriver.until;
const test      = require('selenium-webdriver/testing')
const url       = 'http://localhost:8080/foods.html'

test.describe('Foods Index Page', function() {
  let driver
  this.timeout(10000)

  test.beforeEach(() => {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build()
  })

  test.afterEach(() => {
    driver.quit()
  })

  test.it('shows all foods currently saved in database', () => {
    driver.get(`${url}`)
    driver.wait(until.elementLocated({css: '.food-name'}))
    driver.findElements({css: '.food-name'})
      .then((foods) => {
        foods.forEach((food) => {
          assert(food.isDisplayed())
        })
      })
  })

  //Need to incorporate delete functionality so I can delete the newly created food
  // test.it('allows user to add a new food', () => {
  //   driver.get(`${url}`)
  //   driver.wait(until.elementLocated({css: '.food-name'}))
  //   driver.findElements({css: '.food-name'})
  //     .then((foods) => {
  //       const originalFoodCount = foods.length
  //       driver.findElement({css: 'input[name="food-name"]'}).sendKeys('Potato')
  //       driver.findElement({css: 'input[name="food-calories"]'}).sendKeys('210')
  //       driver.findElement({css: '#add-food'}).click()
  //     })
  // })
})