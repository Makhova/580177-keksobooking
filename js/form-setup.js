'use strict';

(function () {
  var addressField = document.querySelector('#address');
  var getMainPinX = function () {
    var mainPinX = Math.round(parseInt(window.global.mainPin.style.left, 10) + 0.5 * parseInt(window.global.mainPinWidth, 10));

    return mainPinX;
  };

  var getMainPinCentreY = function () {
    var mainPinCentreY = Math.round(parseInt(window.global.mainPin.style.top, 10) + 0.5 * parseInt(window.global.mainPinHeight, 10));

    return mainPinCentreY;
  };

  /* var getMainPinY = function () {
    var mainPinY = Math.round(parseInt(window.global.mainPin.style.top, 10) + parseInt(window.global.mainPinHeight, 10));

    return mainPinY;
  }; */

  addressField.value = getMainPinX() + ', ' + getMainPinCentreY();
  /* var getAddressCoords = function () {
    addressField.value = getMainPinX() + ', ' + getMainPinY();
  }; */
  var accomodationList = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var minPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var setMinPrice = function (price) {
    priceField.min = price;
    priceField.placeholder = price;
  };

  accomodationList.addEventListener('change', function (evt) {
    setMinPrice(minPrice[evt.target.value]);
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });
}) ();
