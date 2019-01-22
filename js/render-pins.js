'use strict';

(function () {
  window.renderPins = function (adverts) {
    var pins = document.querySelector('.map__pins');
    var pin = document.querySelector('.map__pin');
    var pinWidth = pin.offsetWidth;
    var pinHeight = pin.offsetHeight;
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinFragment = document.createDocumentFragment();

    adverts.slice(0, 5).forEach(function (item, index) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.querySelector('img').src = item.author.avatar;
      pinElement.style.left = (item.location.x - 0.5 * pinWidth) + 'px';
      pinElement.style.top = item.location.y - pinHeight + 'px';
      pinElement.dataset.id = index;
      pinFragment.appendChild(pinElement);
      pins.appendChild(pinFragment);
    });
  };
})();
