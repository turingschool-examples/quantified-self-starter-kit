// const $ = require('jquery'),
//       assert = require('chai').assert,
//       sinon = require('sinon'),
//       MealsApi = require('../../lib/apis/meals-api.js');
//
// describe('MealsApi', () => {
//   beforeEach(function () {
//    this.callback = sinon.spy();
//
//    // Stubbing the ajax method
//    sinon.stub($, 'ajax').callsFake( function (options) {
//      // Creating a deffered object
//      var dfd = $.Deferred();
//
//      // assigns success callback to done.
//      const data = {url: "bit.ly/aaaa"};
//      if(options.success) dfd.done(options.success({status_code: 200, data: data}));
//
//      // assigns error callback to fail.
//      if(options.error) dfd.fail(options.error);
//      dfd.success = dfd.done;
//      dfd.error = dfd.fail;
//
//      // returning the deferred object so that we can chain it.
//      return dfd;
//    });
//
//   });
//
//   afterEach(function () {
//    $.ajax.restore();
//   });
//
//   describe('.getMeals', () => {
//     it('it returns an array with the meal JSON', () => {
//       MealsApi.getMeals()
//         .then( (data) => {
//           assert.typeOf(data, 'array');
//           assert.equal(data.length, 4);
//           assert.equal(data[0].name, "Breakfast");
//           assert.equal(data[1].name, "Snacks");
//           assert.equal(data[2].name, "Lunch");
//           assert.equal(data[3].name, "Dinner");
//         });
//       done();
//     });
//   });
// });
