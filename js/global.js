'use strict';

(function () {
  var body = document.querySelector('body');
  var bodyWidth = body.offsetWidth;
  var cards = [];
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin');
  var pinWidth = pin.offsetWidth;
  var pinHeight = pin.offsetHeight;
  var PIN_HALF_WIDTH = pinWidth / 2;
  var LOCATION_MIN_X = PIN_HALF_WIDTH;
  var LOCATION_MAX_X = bodyWidth - PIN_HALF_WIDTH;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;
  var ESC_KEYCODE = 27;
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;

  window.global = {
    body: body,
    bodyWidth: bodyWidth,
    cards: cards,
    map: map,
    pins: pins,
    pin: pin,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    LOCATION_MIN_X: LOCATION_MIN_X,
    LOCATION_MAX_X: LOCATION_MAX_X,
    LOCATION_MIN_Y: LOCATION_MIN_Y,
    LOCATION_MAX_Y: LOCATION_MAX_Y,
    ESC_KEYCODE: ESC_KEYCODE,
    mainPin: mainPin,
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight,
    getLinkAvatar: function (index) {
      var avatar = 'img/avatars/user' + 0 + (index + 1) + '.png';
      return avatar;
    },
    getRandomNumber: function (min, max) {
      var randomNumber = Math.floor(Math.random() * (max - min) + min);
      return randomNumber;
    },
    getRandomNumberFromArray: function (array) {
      var randomIndex = window.global.getRandomNumber(0, array.length - 1);
      return array[randomIndex];
    }
  };

}) ();
