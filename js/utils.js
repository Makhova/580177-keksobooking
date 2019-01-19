'use strict';

(function () {
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;
  var ESC_KEYCODE = 27;

  window.utils = {
    LOCATION_MIN_Y: LOCATION_MIN_Y,
    LOCATION_MAX_Y: LOCATION_MAX_Y,
    ESC_KEYCODE: ESC_KEYCODE,

    getLinkAvatar: function (index) {
      var avatar = 'img/avatars/user' + 0 + (index + 1) + '.png';
      return avatar;
    },
    getRandomNumber: function (min, max) {
      var randomNumber = Math.floor(Math.random() * (max - min) + min);
      return randomNumber;
    },
    getRandomNumberFromArray: function (array) {
      var randomIndex = window.utils.getRandomNumber(0, array.length - 1);
      return array[randomIndex];
    },
    errorHandler: function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      var errorFragment = document.createDocumentFragment();
      errorFragment.appendChild(errorElement);
      var map = document.querySelector('.map');
      var error = map.querySelector('.error');
      if (error) {
        map.replaceChild(errorFragment, error);
      } else {
        map.appendChild(errorFragment);
      }

      var errorButton = document.querySelector('.error__button');

      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        map.removeChild(error);
      });
    }
  };
})();
