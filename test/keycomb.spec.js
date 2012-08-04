// Require modules
var assert = require('assert');
var jsdom = require('jsdom');
var keycomb = require(__dirname + '/../src/keycomb.js');

// Describe tests
describe('keycomb.Combination', function() {

  describe('#trigger()', function() {

    it('should execute the callback with correct context if context is provided', function(done) {

      var _this = this;
      var document = jsdom.jsdom('<html><head></head><body>hello world</body></html>');
      var div = document.createElement('div');
      var cb = function() {
        if (_this === this) {
          done();
        }
      };

      var comb = new keycomb.Combination(['backspace', 'tab'], cb, div, this);
      comb.trigger();

    });

    it('should execute the callback with correct context if no context is provided', function(done) {

      var _this = this;
      var document = jsdom.jsdom('<html><head></head><body>hello world</body></html>');
      var div = document.createElement('div');
      var cb = function() {
        if (comb === this) {
          done();
        }
      };

      var comb = new keycomb.Combination(['backspace', 'tab'], cb, div);
      comb.trigger();

    });

  });

});
