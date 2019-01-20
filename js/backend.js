'use strict';

(function () {
  var load = function (loadSuccess, loadError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        loadSuccess(xhr.response);
      } else {
        loadError();
      }
    });

    xhr.addEventListener('error', function () {
      loadError();
    });

    xhr.addEventListener('timeout', function () {
      if (xhr.timeout >= 10000) {
        loadError();
      }
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  var errorHandler = function () {
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
      map.removeChild(map.querySelector('.error'));
    });
  };

  window.backend = {
    load: load,
    errorHandler: errorHandler
  };
})();
