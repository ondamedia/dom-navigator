/*
 * jquery.navigator
 *
 *
 * Copyright (c) 2014 Rubens Mariuzzo
 * Licensed under the MIT license.
 */

/* globals define */

(function(factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }

}(function($) {

  //-------------//
  // Constructor //
  //-------------//

  var Navigator = function(element, options) {
    this.document = $(document);
    this.element = element;
    this.options = $.extend({}, Navigator.defaults, options);
    this.selected = null;
    this.enable();
  };

  Navigator.defaults = {
    selected: 'selected',
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  //---------//
  // Methods //
  //---------//

  Navigator.prototype.enable = function() {
    // Create map of movement methods by keys.
    var keys = {};
    keys[this.options.left] = this.left;
    keys[this.options.up] = this.up;
    keys[this.options.right] = this.right;
    keys[this.options.down] = this.down;

    // Bind keydown event.
    var instance = this;
    this.document.bind('keydown', function(event) {
      if (keys[event.which]) {
        keys[event.which].call(instance);
      }
    });
  };

  Navigator.prototype.disable = function() {
    this.document.unbind('keydown');
  };

  Navigator.prototype.destroy = function() {
    this.disable();
    this.element.removeData('navigator');
  };

  Navigator.prototype.left = function() {
    if (!this.selected) {
      this.element.children().eq(0).addClass(this.options.selected);
    }
  };

  Navigator.prototype.up = function() {
    if (!this.selected) {
      this.element.children().eq(0).addClass(this.options.selected);
    }
  };

  Navigator.prototype.right = function() {
    if (!this.selected) {
      this.element.children().eq(0).addClass(this.options.selected);
    }
  };

  Navigator.prototype.down = function() {
    if (!this.selected) {
      this.element.children().eq(0).addClass(this.options.selected);
    }
  };

  Navigator.prototype.selected = function() {
    return this.selected;
  };

  //--------------------------//
  // jQuery plugin definition //
  //--------------------------//

  var old = $.fn.navigator;

  $.fn.navigator = function(method) {

    // Parse arguments.
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function() {

      var $this = $(this),
        instance = $this.data('navigator');

      // Create Navigator instance.
      if (!instance) {
        $this.data('navigator', (instance = new Navigator($this, typeof method === 'object' && method)));
      }

      // Invoke given method with given arguments.
      if (typeof method === 'string' && instance[method]) {
        instance[method].apply(instance, args);
      }

    });
  };

  $.fn.navigator.Constructor = Navigator;

  //---------------------------//
  // jQuery plugin no conflict //
  //---------------------------//

  $.fn.navigator.noConflict = function() {
    $.fn.navigator = old;
    return this;
  };

}));
