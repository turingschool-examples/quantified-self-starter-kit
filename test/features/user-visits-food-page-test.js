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

  test.it('it shows all foods currently saved in database', () => {
    driver.get(`${url}`)
    driver.wait(until.elementLocated({css: '.food-name'}))
    driver.findElements({css: '.food-name'})
      .then((foods) => {
        assert.lengthOf(foods, 12)
      })
  })
})