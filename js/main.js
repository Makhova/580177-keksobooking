'use strict';

var body = document.querySelector('body');
var bodyWidth = body.offsetWidth;
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth;
var pinHeight = pin.offsetHeight;
var PIN_HALF_WIDTH = pinWidth / 2;
var LOCATION_MIN_X = PIN_HALF_WIDTH;
var LOCATION_MAX_X = bodyWidth - PIN_HALF_WIDTH;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var ESC_KEYCODE = 27;
var accomodation = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var advertsNumber = 8;
var mainPin = document.querySelector('.map__pin--main');
var mainPinWidth = mainPin.offsetWidth;
var mainPinHeight = mainPin.offsetHeight;
var addressField = document.querySelector('#address');

var getLinkAvatar = function (index) {
  var avatar = 'img/avatars/user' + 0 + (index + 1) + '.png';

  return avatar;
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);

  return randomNumber;
};

var getRandomNumberFromArray = function (array) {
  var randomIndex = getRandomNumber(0, array.length - 1);

  return array[randomIndex];
};

var createCards = function (cardsCount) {
  var cards = [];
  var card = {};

  for (var i = 0; i < cardsCount; i++) {
    card = {
      author: {
        avatar: getLinkAvatar(i),
      },

      offer: {
        type: getRandomNumberFromArray(accomodation),
      },

      location: {
        x: getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X),
        y: getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y),
      },
    };
    cards.push(card);
  }

  return cards;
};

var cards = createCards(advertsNumber);

var renderPins = function (adverts) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  adverts.forEach(function (item, index) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.style.left = (item.location.x - 0.5 * pinWidth) + 'px';
    pinElement.style.top = item.location.y - pinHeight + 'px';
    pinElement.dataset.id = index;
    pinFragment.appendChild(pinElement);
    pins.appendChild(pinFragment);
  });
};

var getMainPinX = function () {
  var mainPinX = Math.round(parseInt(mainPin.style.left, 10) + 0.5 * parseInt(mainPinWidth, 10));

  return mainPinX;
};

var getMainPinCentreY = function () {
  var mainPinCentreY = Math.round(parseInt(mainPin.style.top, 10) + 0.5 * parseInt(mainPinHeight, 10));

  return mainPinCentreY;
};

var getMainPinY = function () {
  var mainPinY = Math.round(parseInt(mainPin.style.top, 10) + parseInt(mainPinHeight, 10));

  return mainPinY;
};

addressField.value = getMainPinX() + ', ' + getMainPinCentreY();

var getAddressCoords = function () {
  addressField.value = getMainPinX() + ', ' + getMainPinY();
};

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
      x: Math.floor(LOCATION_MIN_X - PIN_HALF_WIDTH),
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
    getAddressCoords();
    renderPins(cards);
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

var renderCard = function (item) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = item.author.avatar;
  cardElement.querySelector('.popup__type').textContent = item.offer.type;
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(cardElement);
  var popup = map.querySelector('.popup');
  if (popup) {
    map.replaceChild(cardFragment, popup);
  } else {
    map.appendChild(cardFragment);
  }
};

var popupButtonClickHandler = function () {
  var popup = map.querySelector('.popup');
  var popupCloseButton = document.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    map.removeChild(popup);
  });
};

var closeCard = function () {
  var popup = document.querySelector('.popup');
  if (!(popup === null)) {
    map.removeChild(popup);
  }
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
});

pins.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target;
  var activePin = target.parentElement.dataset.id;

  if (activePin) {
    renderCard(cards[activePin]);
    popupButtonClickHandler();
  }
});

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

