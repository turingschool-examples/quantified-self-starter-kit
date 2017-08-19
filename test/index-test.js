// const assert = require('chai').assert
// const webdriver = require('selenium-webdriver')
// const until = webdriver.until
// const test = require('selenium-webdriver/testing')
// const frontEndLocation = "http://localhost:8080"
// const fs = require('fs')
// 
// describe('our test bundle', function() {
// 	it('works', function() {
// 		assert(true)
// 	})
// })
//
// test.describe('testing index page', function() {
// 	let driver
// 	this.timeout(10000)
//
// 	test.beforeEach(function () {
// 		driver = new webdriver.Builder()
// 		.forBrowser('chrome')
// 		.build()
// 	})
//
// 	test.afterEach(function () {
// 		driver.quit()
// 	})
//
// 	test.it("lists all foods on load", function() {
// 		driver.get(`${frontEndLocation}`)
// 		driver.wait(until.elementLocated({css: "#foods .food-item"}))
// 		driver.findElements({css: "#foods .food-item"})
// 		.then(function (foods) {
// 			assert.lengthOf(foods, 12)
// 		})
// 	})
// })
