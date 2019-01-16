'use strict';

(function () {
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var pin = document.querySelector('.map__pin');
  var pinWidth = pin.offsetWidth;
  var pinHeight = pin.offsetHeight;
  var pinHalfWidth = pinWidth / 2;
  var locationMinX = pinHalfWidth;
  var cards = window.createCards();

  var activatePage = function () {
    map.classList.remove('map--faded');
    var advertForm = document.querySelector('.ad-form');
    advertForm.classList.remove('ad-form--disabled');
    var fieldset = document.querySelectorAll('fieldset');
    var select = document.querySelectorAll('select');

    fieldset.forEach(function (item) {
      item.disabled = false;
    });

    select.forEach(function (item) {
      item.disabled = false;
    });
  };

  var mouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var minCoords = {
        x: Math.floor(locationMinX - pinHalfWidth),
        y: Math.floor(LOCATION_MIN_Y - pinHeight)
      };

      var maxCoords = {
        x: Math.floor(map.offsetWidth - pinWidth),
        y: Math.floor(LOCATION_MAX_Y - pinHeight)
      };

      if (newCoords.x < minCoords.x) {
        newCoords.x = minCoords.x;
      }

      if (newCoords.y < minCoords.y) {
        newCoords.y = minCoords.y;
      }

      if (newCoords.x > maxCoords.x) {
        newCoords.x = maxCoords.x;
      }

      if (newCoords.y > maxCoords.y) {
        newCoords.y = maxCoords.y;
      }

      mainPin.style.left = newCoords.x + 'px';
      mainPin.style.top = newCoords.y + 'px';

      activatePage();
      window.getAddressCoords();
      window.renderPins(cards);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  mainPin.addEventListener('mousedown', mouseDownHandler);
})();
