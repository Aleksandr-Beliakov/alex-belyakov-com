/* Безопасная работа с localStorage/sessionStorage (в приватном режиме и при блокировке они бросают исключение; поэтому имя хранилища передается строкой) */
var abStore = {
  get: function (store, key) { try { return window[store].getItem(key); } catch (e) { return null; } },
  set: function (store, key, value) { try { window[store].setItem(key, value); } catch (e) {} }
};

function abFaqToggle(btn) {
  var item = btn.closest('.ab-faq-item');
  var isOpen = item.classList.contains('is-open');
  document.querySelectorAll('.ab-faq-item').forEach(function (el) { el.classList.remove('is-open'); });
  if (!isOpen) item.classList.add('is-open');
}

function abToggleMobileNav(btn) {
  var nav = document.querySelector('.ab-header-nav-mobile') || document.querySelector('.ab-header-nav');
  if (!nav) return;
  var menu = document.querySelector('.ab-header-contact-menu.is-open');
  if (menu) menu.classList.remove('is-open');
  var isOpen = nav.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function abToggleContactMenu(btn) {
  var menu = document.querySelector('.ab-header-contact-menu');
  if (!menu) return;
  var nav = document.querySelector('.ab-header-nav-mobile.is-open') || document.querySelector('.ab-header-nav.is-open');
  if (nav) nav.classList.remove('is-open');
  var isOpen = menu.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function abOpenPopup(name) {
  var el = document.getElementById('popup-' + name);
  if (el) el.classList.add('is-open');
}

function abClosePopup(name) {
  var el = document.getElementById('popup-' + name);
  if (el) el.classList.remove('is-open');
}

document.addEventListener('click', function (e) {
  var trigger = e.target.closest('[data-popup]');
  if (trigger) {
    e.preventDefault();
    abOpenPopup(trigger.getAttribute('data-popup'));
    return;
  }
  if (e.target.classList.contains('ab-popup-overlay')) {
    e.target.classList.remove('is-open');
  }

  var openNav = document.querySelector('.ab-header-nav-mobile.is-open, .ab-header-nav.is-open');
  if (openNav && !e.target.closest('.ab-header-nav-mobile') && !e.target.closest('.ab-header-nav') && !e.target.closest('.ab-header-burger')) {
    openNav.classList.remove('is-open');
  } else if (openNav && e.target.closest('.ab-header-nav-mobile a, .ab-header-nav a')) {
    openNav.classList.remove('is-open');
  }

  var openMenu = document.querySelector('.ab-header-contact-menu.is-open');
  if (openMenu && !e.target.closest('.ab-header-mobile-icons')) {
    openMenu.classList.remove('is-open');
  } else if (openMenu && e.target.closest('.ab-header-contact-item')) {
    openMenu.classList.remove('is-open');
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    var open = document.querySelector('.ab-popup-overlay.is-open');
    if (open) open.classList.remove('is-open');
    var openNav = document.querySelector('.ab-header-nav-mobile.is-open, .ab-header-nav.is-open');
    if (openNav) openNav.classList.remove('is-open');
    var openMenu = document.querySelector('.ab-header-contact-menu.is-open');
    if (openMenu) openMenu.classList.remove('is-open');
  }
});

function abOpenLightboxSrc(src) {
  if (!src) return;
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(23,21,18,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:40px;';
  var big = document.createElement('img');
  big.src = src;
  big.style.cssText = 'max-width:100%;max-height:100%;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.4);';
  overlay.appendChild(big);
  function close() { overlay.remove(); document.removeEventListener('keydown', onKey); }
  function onKey(e) { if (e.key === 'Escape') close(); }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
}

function abOpenLightbox(imgEl) {
  abOpenLightboxSrc(imgEl.currentSrc || imgEl.src);
}

var abRevealEls = document.querySelectorAll('.ab-reveal');
if (abRevealEls.length && 'IntersectionObserver' in window) {
  var abRevealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        abRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  abRevealEls.forEach(function (el) { abRevealObserver.observe(el); });
} else {
  abRevealEls.forEach(function (el) { el.classList.add('is-visible'); });
}

function abReviewsSlide(btn, dir) {
  var slider = btn.closest('.ab-reviews-slider');
  var row = slider && slider.querySelector('.ab-reviews-row');
  if (!row) return;
  row.scrollBy({ left: dir * row.clientWidth, behavior: 'smooth' });
}

function abProcessSlide(btn, dir) {
  var slider = btn.closest('.ab-process-slider');
  var row = slider && slider.querySelector('.ab-process-row');
  if (!row) return;
  var card = row.querySelector('.ab-reveal');
  var step = card ? card.getBoundingClientRect().width + 20 : row.clientWidth;
  row.scrollBy({ left: dir * step, behavior: 'smooth' });
}

(function () {
  var row = document.querySelector('.ab-process-row');
  if (!row) return;

  var isDown = false, startX = 0, startScroll = 0;
  row.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    isDown = true;
    row.classList.add('is-dragging');
    startX = e.clientX;
    startScroll = row.scrollLeft;
  });
  window.addEventListener('pointermove', function (e) {
    if (!isDown) return;
    row.scrollLeft = startScroll - (e.clientX - startX);
  });
  window.addEventListener('pointerup', function () {
    isDown = false;
    row.classList.remove('is-dragging');
  });

  var dotsWrap = document.querySelector('.ab-process-dots');
  var cards = row.querySelectorAll('.ab-reveal');
  if (dotsWrap && cards.length && 'IntersectionObserver' in window) {
    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'ab-process-dot' + (i === 0 ? ' is-active' : '');
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.ab-process-dot');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = Array.prototype.indexOf.call(cards, entry.target);
        dots.forEach(function (d) { d.classList.remove('is-active'); });
        if (dots[idx]) dots[idx].classList.add('is-active');
      });
    }, { root: row, threshold: 0.6 });
    cards.forEach(function (c) { observer.observe(c); });
  }
})();

/* ===== Международная главная: exit-intent попап (десктоп, один раз за сессию) ===== */
(function () {
  var popup = document.getElementById('popup-exit');
  if (!popup) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (abStore.get('sessionStorage', 'ab_exit_shown')) return;

  var armed = false;
  var lastY = null;
  var movingUp = false;

  // Не слушаем сразу после загрузки — даём странице отрисоваться/сдвинуться,
  // чтобы это не принялось за уход с сайта.
  setTimeout(function () { armed = true; }, 3000);

  document.addEventListener('mousemove', function (e) {
    if (lastY !== null) movingUp = e.clientY < lastY;
    lastY = e.clientY;
  });

  document.addEventListener('mouseout', function (e) {
    if (!armed) return;
    if (abStore.get('sessionStorage', 'ab_exit_shown')) return;
    // Настоящий уход: курсор реально двигался вверх и покинул окно сверху.
    if (!movingUp || e.clientY > 0 || e.relatedTarget) return;
    if (document.querySelector('.ab-popup-overlay.is-open')) return;
    abStore.set('sessionStorage', 'ab_exit_shown', '1');
    popup.classList.add('is-open');
  });
})();

/* Попапы: семантика диалога для скринридеров */
document.querySelectorAll('.ab-popup-overlay').forEach(function (el) {
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
});

/* Поля попапов без подписи: берем название для скринридера из placeholder */
document.querySelectorAll('.ab-popup-overlay input[placeholder], .ab-popup-overlay textarea[placeholder]').forEach(function (el) {
  if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.getAttribute('placeholder'));
});
