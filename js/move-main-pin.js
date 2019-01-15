'use strict';


(function () {
  var activatePage = function () {
    window.global.map.classList.remove('map--faded');
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
        x: window.global.mainPin.offsetLeft - shift.x,
        y: window.global.mainPin.offsetTop - shift.y
      };

      var minCoords = {
        x: Math.floor(window.global.LOCATION_MIN_X - window.global.PIN_HALF_WIDTH),
        y: Math.floor(window.global.LOCATION_MIN_Y - window.global.pinHeight)
      };

      var maxCoords = {
        x: Math.floor(window.global.map.offsetWidth - window.global.pinWidth),
        y: Math.floor(window.global.LOCATION_MAX_Y - window.global.pinHeight)
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

      window.global.mainPin.style.left = newCoords.x + 'px';
      window.global.mainPin.style.top = newCoords.y + 'px';

      activatePage();
      // getAddressCoords();
      // renderPins(cards);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.global.mainPin.addEventListener('mousedown', mouseDownHandler);
}) ();
