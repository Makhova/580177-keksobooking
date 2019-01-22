'use strict';

(function () {
  var PRICE = {
    MIN: 10000,
    MAX: 50000
  };
  var mapFilters = document.querySelector('.map__filters');

  var updatePins = function (adverts) {
    var filteredAdverts = adverts.slice();

    var selectFilters = mapFilters.querySelectorAll('select');
    var checkboxFilters = mapFilters.querySelectorAll('input[type=checkbox]:checked');
    var filtersIdMap = {
      'housing-type': 'type',
      'housing-price': 'price',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (select, property) {
      return filteredAdverts.filter(function (advert) {
        return advert.offer[property] === select.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredAdverts.filter(function (advert) {
        var priceValueMap = {
          'middle': advert.offer.price >= PRICE.MIN && advert.offer.price >= PRICE.MAX,
          'low': advert.offer.price <= PRICE.MIN,
          'high': advert.offer.price >= PRICE.MAX
        };

        return priceValueMap[priceFilter.value];
      });
    };

    var filterByFeatures = function (features) {
      return filteredAdverts.filter(function (advert) {
        return advert.offer.features.includes(features.value);
      });
    };

    selectFilters.forEach(function (item) {
      if (item.value !== 'any') {
        if (item.id !== 'housing-price') {
          filteredAdverts = filterByValue(item, filtersIdMap[item.id]);
        } else {
          filteredAdverts = filterByPrice(item);
        }
      }
    });

    checkboxFilters.forEach(function (item) {
      filteredAdverts = filterByFeatures(item);
    });

    window.renderPins(filteredAdverts);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    var pinsBlock = document.querySelector('.map__pins');
    for (var i = 1; i < pins.length; i++) {
      pinsBlock.removeChild(pins[i]);
    }
  };

  var removeCard = function () {
    var map = document.querySelector('.map');
    var popup = document.querySelector('.popup');
    if (popup !== null) {
      map.removeChild(popup);
    }
  };

  var filtersChangeHandler = function () {
    removePins();
    removeCard();
    window.backend.load(updatePins);
  };

  mapFilters.addEventListener('change', filtersChangeHandler);
})();
