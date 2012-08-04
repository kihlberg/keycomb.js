/**
 * Namespace to keep things in proper scope.
 *
 * @author Olof Kihlberg <olof.kihlberg@gmail.com>
 */
var keycomb = (function() {

  /**
   * Map key codes to common keys
   *
   * @type {Object}
   */
  var keys = {
    8 : 'backspace',
    9 : 'tab',
    13 : 'enter',
    16 : 'shift',
    17 : 'ctrl',
    18 : 'alt',
    19 : 'pause/break',
    20 : 'caps',
    27 : 'escape',
    33 : 'page up',
    34 : 'page down',
    35 : 'end',
    36 : 'home',
    37 : 'arrow left',
    38 : 'arrow up',
    39 : 'arrow right',
    40 : 'arrow down',
    45 : 'insert',
    46 : 'delete',
    91 : 'window left',
    92 : 'window right',
    93 : 'select',
    96 : 'numpad 0',
    97 : 'numpad 1',
    98 : 'numpad 2',
    99 : 'numpad 3',
    100 : 'numpad 4',
    101 : 'numpad 5',
    102 : 'numpad 6',
    103 : 'numpad 7',
    104 : 'numpad 8',
    105 : 'numpad 9',
    106 : 'multiply',
    107 : 'add',
    109 : 'subtract',
    110 : 'decimal point',
    111 : 'divide',
    112 : 'F1',
    113 : 'F2',
    114 : 'F3',
    115 : 'F4',
    116 : 'F5',
    117 : 'F6',
    118 : 'F7',
    119 : 'F8',
    120 : 'F9',
    121 : 'F10',
    122 : 'F11',
    123 : 'F12',
    144 : 'num lock',
    145 : 'scroll lock',
    186 : ';',
    187 : '=',
    188 : ',',
    189 : '-',
    190 : '.',
    191 : '/',
    192 : '`',
    219 : '[',
    220 : '\\',
    221 : ']',
    222 : '"'
  };

  /**
   * Listen for a combination of keys being pressed and act when it has.
   *
   * @constructor
   * @param {Array} chars Array of characters to listen for.
   * @param {Function} callback Callback function to execute when comination is entered.
   * @param {Element} element The element to listen for key combinations on. Optional.
   * @param {Object} context The this context for callback, optional.
   */
  function Combination(chars, callback, element, context) {

    /**
     * Reference to this
     *
     * @type {Object}
     */
    var _this = this;

    /**
     * Keep track of what character we want next
     *
     * @type {Number}
     */
    this.wanted = 0;

    /**
     * Callback to execute when combination is pressed
     *
     * @type {Function}
     */
    this.callback = callback;

    /**
     * Context for callback
     *
     * @type {Object}
     */
    this.context = context || this;

    /**
     * Handle key up events
     *
     * @type {Function}
     * @param {Event} e The event being triggered.
     */
    var onKeyUp = function(e) {

      var code = e.which ? e.which : e.keyCode;
      var c = keys[code] === undefined ? String.fromCharCode(code) : keys[code];

      if (c === chars[wanted]) {
        wanted++;
        if (wanted === chars.length) {
          wanted = 0;
          _this.exexute();
        }
      } else {
        wanted = 0;
      }

    };

    // Listen to key up event
    if (element.addEventListener) {
      element.addEventListener('keyup', onKeyUp, false);
    } else if (element.attachEvent) {
      element.attachEvent('onkeyup', onKeyUp);
    }

  };

  /**
   * Execute the callback with correct context
   */
  Combination.prototype.trigger = function() {

    this.callback.apply(this.context);

  };

  // Return whatever is public
  return {

    'Combination': Combination

  };

})();

// Export for testability in Mocha
var exports = exports || {};
exports.Combination = keycomb.Combination;
