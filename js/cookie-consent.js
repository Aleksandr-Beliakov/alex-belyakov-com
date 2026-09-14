(function () {
  var STORAGE_KEY = 'cookie_consent';

  function showBanner() {
    var el = document.createElement('div');
    el.className = 'ab-cookie-banner';
    el.innerHTML =
      '<p class="ab-cookie-banner-text">Этот сайт использует файлы cookie для корректной работы, улучшения пользовательского опыта и анализа посещаемости. Нажимая кнопку «Принять» или продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookie. <a href="/privacy.html#cookies" target="_blank" rel="noopener noreferrer" class="ab-cookie-banner-link">Подробнее.</a></p>' +
      '<button type="button" class="ab-cookie-banner-accept">Принять</button>';
    document.body.appendChild(el);

    el.querySelector('.ab-cookie-banner-accept').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      el.remove();
    });
  }

  function init() {
    var consent = localStorage.getItem(STORAGE_KEY);
    if (consent !== 'accepted') {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
