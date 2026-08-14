# Сайт alex-belyakov.com — техническая документация

Этот файл — справка для владельца сайта (не программиста) и для новой сессии Claude Code, чтобы быстро понять структуру и историю проекта без необходимости пересматривать всю переписку.

## 1. Общее описание

- **Что это:** временная страница-заглушка главного домена Александра Белякова, пока полноценный сайт не готов.
- **Домен:** `alex-belyakov.com` (задаётся файлом `CNAME` в корне репозитория).
- **Репозиторий:** https://github.com/Aleksandr-Beliakov/alex-belyakov-com
- **Хостинг:** GitHub Pages, статический сайт без сборки — чистый HTML, без npm/фреймворков.
- **Шрифт:** Google Fonts «Golos Text», подключается через `<link>` в `<head>`.
- **Стиль вёрстки:** оформление — инлайн `style="..."` прямо в HTML, по дизайн-системе из `D:\My Docs\My Agency\alex-belyakov.com\Документация по сайту\Design System сайта - Беляков.md` (тот же стиль, что и у `direct.alex-belyakov.com`).
- **Связанный сайт:** `direct.alex-belyakov.com` (репозиторий `direct`) — полноценный лендинг по Яндекс Директу, уже готов и работает. Заглушка ссылается на него для тех, кто ищет именно Директ.

## 2. Структура файлов

```
/index.html   — единственная страница на сегодня: заглушка (имя, специализация, фраза «полная версия скоро», ссылка на direct.alex-belyakov.com)
/images/      — картинки страницы
  face-avatar.jpg — круглое мини-фото (сжатая копия face-avatar.jpg из репозитория direct, 400×400, ~26 КБ) со статус-точкой, используется вместо лого
/CNAME        — файл для GitHub Pages, содержит домен alex-belyakov.com
```

## 3. Google Tag Manager — обязателен на КАЖДОЙ странице

На сайте установлен GTM с ID **`GTM-W7RNPJSZ`**. Это требование владельца сайта: **GTM должен быть на всех страницах без исключений, включая любые новые страницы, которые появятся в будущем.**

При создании новой страницы обязательно копировать оба блока из `index.html`:

1. Скрипт — сразу после открывающего тега `<head>`, как можно выше:
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W7RNPJSZ');</script>
<!-- End Google Tag Manager -->
```

2. `<noscript>` — сразу после открывающего тега `<body>`:
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W7RNPJSZ"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Не путать с сайтом `direct.alex-belyakov.com` — там GTM не установлен, это отдельный репозиторий со своей аналитикой (см. его README, раздел про Web3Forms/dataLayer).

## 4. Что сделано и что отложено

**Сделано:**
- Страница-заглушка на главной, стиль по дизайн-системе (шрифт, палитра, компоненты).
- GTM подключён на `index.html` (см. раздел 3).

**Отложено:**
- Полноценный лендинг (структура задана в разделе 6 дизайн-системы) — будет собираться позже, по мере готовности материалов.
- При добавлении любой новой страницы — не забыть GTM (раздел 3) и favicon.
