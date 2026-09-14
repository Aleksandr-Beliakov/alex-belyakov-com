(function () {
  var STORAGE_KEY = 'cookie_consent';

  function loadGTM() {
    if (window.__abGtmLoaded) return;
    window.__abGtmLoaded = true;

    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-W7RNPJSZ');
  }

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
      loadGTM();
    });
  }

  function init() {
    var consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'accepted') {
      loadGTM();
    } else {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
