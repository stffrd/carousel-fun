
/** Event Normalization */

/**
 * 1. Normalize Desktop events between mouseup/mousemove/mousedown
 * 2. If pointer / MSPointer enabled, use those instead.
 */

//TODO: put in a support module
var supports = {
    touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
};

/**
 * Retrieve Desktop events that enable drag in a standard object format
 * fallback to using the AWFUL AND DEAD pointer events if we're in IE. 
 */
function _nontouch() {
  var pointers = window.navigator.pointerEnabled;
  var mspointers = window.navigator.pointerEnabled;

  var standard = {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
  },

  pointer = {
    start: mspointers ? 'pointerdown' : 'MSPointerDown',
    move: mspointers ? 'pointermove' : 'MSPointerMove',
    end: mspointers ? 'pointerup' : 'MSPointerUp'
  };

  return pointers ? pointer : standard;
}

function _touch() {
    return {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
    }
}

/**
 * Retrieve Touchscreen events that enable drag in a standard object format. 
 */
function events() {
    return supports.touch ? _touch() : _nontouch(); 
}

module.exports = events(); 
