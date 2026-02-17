# SCAN.LAB: Что еще не покрыто по последнему ТЗ и список правок

Дата: 2026-02-17<br>
Источник требований: `docs/scanlab_tz.md`<br>
Сравнение с текущими страницами: `index.html`, `portfolio.html`, `case.html`, `contacts.html` + общие ассеты `assets/site.css`, `assets/site.js`.

Ниже перечислены пункты, которые **не доведены до полного соответствия ТЗ** (или реализованы частично/как демо), и что конкретно нужно поправить.

## P0 (критично для строгого соответствия ТЗ)

- [ ] **SVG-логотип в header/footer (вместо икон-символа).**
  - Сейчас: используется Material Symbol `deployed_code` (икон-шрифт) в `header`/`footer` на всех страницах.
  - Нужно:
    - добавить `assets/brand/scanlab-logo.svg` (или аналогичное имя)
    - заменить текущий “квадрат + символ” на `<img src="assets/brand/scanlab-logo.svg" ...>` или inline `<svg>` (без inline-style)
    - обновить UI kit примеры (`ui-kit-*.html`) аналогично.

- [ ] **Иконки только SVG (убрать Material Icons/Material Symbols).**
  - ТЗ п.6: “Иконки: только векторный формат (SVG)”.
  - Сейчас: по проекту используются икон-шрифты (подключение Google Fonts Material Icons + `<span class="material-icons...">`).
  - Нужно:
    - завести набор SVG-иконок в `assets/icons/` (или `assets/ui/icons/`)
    - заменить все `<span class="material-icons...">...</span>` и `material-symbols-outlined` на SVG
    - удалить лишние подключения икон-шрифтов из `<head>` (уменьшит внешние запросы и ускорит загрузку).

- [ ] **Анимация при фильтрации портфолио (Fade/Scale), без перезагрузки.**
  - ТЗ п.7.1: “мягкая анимация (Fade/Scale) при переключении категорий”.
  - Сейчас: фильтрация в `assets/site.js` просто добавляет/убирает `hidden` (без переходов).
  - Нужно:
    - обновить `assets/site.css`: состояния карточки (например, `.portfolio-card--hide` / `.is-filtering`) через `opacity/transform` + transition
    - обновить `assets/site.js` (`initPortfolioFilters()`): сначала анимировать скрытие, затем `hidden`, затем анимировать показ.

- [ ] **Fade-in при скролле (scroll reveal) для блоков.**
  - ТЗ п.5: “плавное появление элементов (Fade In) при скролле”.
  - Сейчас: нет reveal-логики (нет `IntersectionObserver`/классов вида `is-revealed`).
  - Нужно:
    - добавить в `assets/site.css` базовый класс, например `.reveal` (начальное `opacity:0; transform: translateY(...)`) и `.is-revealed`
    - добавить в `assets/site.js` инициализацию reveal на `DOMContentLoaded` через `IntersectionObserver`
    - разметить ключевые секции/карточки `data-reveal` (минимум: услуги/преимущества/процесс/FAQ, портфолио карточки, блоки кейса).

## P1 (важно, но зависит от контента/интеграций)

- [ ] **Реальная отправка формы (лидогенерация) на почту.**
  - ТЗ п.3.4: форма обратной связи.
  - Сейчас: в `contacts.html` есть конфиг `<meta name="scanlab:form-endpoint" content="">`, при пустом значении работает stub-режим (успешный UX без доставки).
  - Нужно:
    - выбрать провайдера/endpoint (Formspree/Web3Forms/Getform/Netlify Forms/Google Apps Script и т.д.)
    - заполнить `scanlab:form-endpoint` и проверить доставку
    - при необходимости скорректировать формат отправки в `assets/site.js` (некоторые сервисы принимают не JSON, а `application/x-www-form-urlencoded`).

- [ ] **Реальная карта (embed), а не placeholder.**
  - ТЗ п.3.4: карта.
  - Сейчас: `contacts.html` показывает placeholder пока `<meta name="scanlab:map-embed-url" content="">` пустой.
  - Нужно:
    - заполнить `scanlab:map-embed-url` валидным URL embed (Я.Карты/Google Maps)
    - проверить, что iframe грузится без mixed-content/CSP ошибок.

## P2 (качество/перфоманс из ТЗ)

- [ ] **Lazy loading для сеток/галерей.**
  - ТЗ п.5: lazy loading для сетки портфолио.
  - Сейчас: `loading="lazy"` стоит только на части изображений (например, 1 из карточек портфолио); в `case.html` галерея без lazy.
  - Нужно:
    - проставить `loading="lazy"` на изображения в `portfolio.html` (кроме первых above-the-fold)
    - проставить `loading="lazy"` на изображения галереи и “Другие проекты” в `case.html`
    - дополнительно: `decoding="async"`, а для hero-изображений можно `fetchpriority="high"`.

- [ ] **Оптимизация изображений (WebP/AVIF) и локальные ассеты.**
  - ТЗ п.5: “WebP/AVIF”, “оптимизация тяжелых изображений”.
  - Сейчас: большинство изображений внешние (googleusercontent), без `srcset`/форматов.
  - Нужно:
    - собрать локальный набор изображений в `assets/img/`
    - конвертировать в `webp/avif`
    - заменить `<img src="...">` на локальные пути и при необходимости добавить `srcset/sizes`.

## Дополнительно (если нужно довести до 1:1)

- [ ] **Glassmorphism “при скролле”, а не всегда.**
  - ТЗ п.2.2: “при скролле добавляется эффект Glassmorphism”.
  - Сейчас: `.glass-nav` применяется всегда.
  - Нужно (опционально):
    - добавить класс состояния, например `.glass-nav--scrolled`
    - в `assets/site.js` повесить слушатель `scroll` и переключать класс при `scrollY > 8`.

- [ ] **“Другие проекты” как карусель (touch) на `case.html`.**
  - ТЗ п.8.5: карусель из 3-х карточек.
  - Сейчас: сетка `grid` на 3 колонки (без карусели).
  - Нужно (опционально):
    - реализовать горизонтальный скролл/свайп (`overflow-x:auto` + `scroll-snap`) или JS-карусель с кнопками.

## Проверка после правок (QA)

Запуск:

```bash
node scripts/render-pages.js --out renders/scanlab --fail-on-warn --ignore-tailwind-cdn-warning
```

Цель: `consoleErrors=0`, `pageErrors=0`, `requestFailures=0`, `httpErrors=0`.

## Примечание про `input/ТЗ.docx`

Если, помимо `docs/scanlab_tz.md`, требуется соответствие требованиям из `input/ТЗ.docx` (см. `docs/tz_from_docx.md`), то дополнительно остаются открытые пункты:

- подключение Яндекс.Метрики и Google Analytics через `<meta>` (нужны реальные ID)
- расширение SEO (OG/canonical/микроразметка)

Актуальный чеклист по DOCX уже ведется в `docs/tz_from_docx_gaps_checklist.md` (см. незакрытые пункты P2).
