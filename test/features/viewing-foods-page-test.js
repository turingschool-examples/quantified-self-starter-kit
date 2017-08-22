const assert = require('chai').assert
const webdriver = require('selenium-webdriver')
const until = webdriver.until
const test = require('selenium-webdriver/testing')
const frontEndLocation = "http://localhost:8080/foods.html"

test.describe('Our test bundle', function() {
	it('works', function() {
		assert(true)
	})
})

test.describe('Testing Foods Page', function() {
	let driver
	this.timeout(10000)

	test.beforeEach(function () {
		driver = new webdriver.Builder()
		.forBrowser('chrome')
		.build()
	})

	test.afterEach(function () {
		driver.quit()
	})

	test.it("lists all foods from database on load", function() {
		driver.get(`${frontEndLocation}`)
		driver.wait(until.elementLocated({css: '.food-name'}))
		driver.findElements({css: '.food-name'})
		.then(function(foods) {
      foods.forEach(function(food) {
        assert(food.isDisplayed())
      })
		})
	})
})
