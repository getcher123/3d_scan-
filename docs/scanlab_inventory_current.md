# SCAN.LAB: Инвентаризация текущих страниц и соответствие ТЗ (актуальное состояние)

Дата: 2026-02-17<br>
Репозиторий: `/mnt/c/3d_scan`

## 1) Канонические страницы (корень репозитория)

- `index.html` (Главная)
- `services.html` (Услуги)
- `process.html` (Процесс)
- `portfolio.html` (Портфолио)
- `case.html` (Кейс)
- `contacts.html` (Контакты)
- `advantages-faq.html` (Преимущества + FAQ)
- `privacy.html` (Политика конфиденциальности)
- `offer.html` (Публичная оферта)
- `ui-kit-typography.html` (UI kit: типографика/палитра/базовые интерактивы)
- `ui-kit-components.html` (UI kit: навигация/сетки/таблица)
- `ui-kit-blocks.html` (UI kit: блоки услуг/процесс/FAQ/лид-магнит/форма)

Наследие прототипов: подпапки `3d_scan_*/*code.html` и `детали_проекта_(кейс)/code.html` оставлены как redirect-страницы на канонические HTML в корне (см. `docs/scanlab_unification.md`).

## 2) Общие компоненты и единые источники

- Единые токены/компоненты интерактива (кнопки/ссылки/поля/фильтры): `assets/site.css`
- Общий Tailwind CDN config (цвета из CSS variables, шрифты): `assets/tailwind-config.js`
- Общий JS (бургер, active nav, фильтры портфолио, before/after slider): `assets/site.js`

## 3) Инвентаризация блоков по страницам

### 3.1) `index.html` (Главная)

- Sticky Header (glassmorphism): логотип, ссылки (Портфолио/Контакты), контакты (tel/mail), CTA “Написать в Telegram” + secondary “Рассчитать стоимость”, бургер-меню.
- Hero: H1, УТП, 2 CTA, стат-плашки (точность/8K/проекты), hero-изображение.
- “Услуги”: грид карточек (4 шт).
- “О компании”: “С 2015 года”, сегменты, география, социальные доказательства (статы + логотипы как плейсхолдеры).
- “Точность и эффективность”: карточки преимуществ (4 шт).
- Лид-магнит: “Консультация и помощь с техническим заданием” + CTA в Telegram/контакты.
- “Наш процесс”: таймлайн 7 шагов.
- FAQ: аккордеон (`<details>`).
- Footer: ссылки + контакты.

### 3.2) `services.html` (Услуги)

- Sticky Header / Footer (единые).
- Hero: H1, УТП, 2 CTA, стат-плашки, hero-изображение.
- Грид услуг (4 карточки): иконка, заголовок, описание, цена “от…”.
- Блок “Основные услуги” (карточки + quick facts).

### 3.3) `process.html` (Процесс)

- Sticky Header / Footer (единые).
- Hero: H1 + описание.
- “Наш процесс”: 7 шагов (как в ТЗ), визуальная шкала.
- CTA-блок в конце (к переходу на контакты/расчет).

### 3.4) `portfolio.html` (Портфолио)

- Sticky Header / Footer (единые).
- Заголовок + описание.
- Фильтры без перезагрузки (`data-portfolio`, `data-filter`, `data-card`, переключение через классы).
- Инфо-панель статистики (счетчики).
- Mixed Grid карточек:
- Wide/Hero: 2x2 с микро before/after (`data-ba`).
- Vertical: 1x2.
- Square: 1x1.
- Hover: glow рамки + “Смотреть кейс”.
- Кнопка “Загрузить еще проекты” (демо, без подгрузки).

Категории фильтрации (как в ТЗ п.7.1): Все проекты / Архитектура / Музей / Промышленность / Арт.

### 3.5) `case.html` (Кейс)

- Sticky Header / Footer (единые).
- Breadcrumbs.
- Hero: H1 + описание проекта.
- Sidebar параметров: заказчик/срок/точность/форматы + кнопка “Скачать спецификацию (PDF)”.
- Before/After slider (pointer events) (`data-ba`).
- “Технические детали” (оборудование/ПО) карточками.
- “Материалы и выдача”: входные материалы от клиента + выдаваемые результаты/форматы.
- Галерея результатов.
- “Другие проекты” (карточки).
- CTA “Обсудить в Telegram”.

### 3.6) `contacts.html` (Контакты)

- Sticky Header / Footer (единые).
- Карточки контактов (телефон/email/telegram) с `href` и `aria-label`.
- Блок “карта”:
  - разметка `data-map` + iframe `data-map-iframe` (скрыт по умолчанию) + placeholder `data-map-placeholder`
  - embed URL задается через `<meta name="scanlab:map-embed-url" content="" />` (если пусто, остается placeholder).
- Форма лида:
  - разметка `data-form-scope` + `data-form-view="form|success|error"` + `data-lead-form` + `data-form-reset`
  - success/error состояния с Telegram fallback CTA
  - endpoint задается через `<meta name="scanlab:form-endpoint" content="" />` (если пусто, работает stub-режим с success UX).

### 3.7) `advantages-faq.html`

- Sticky Header / Footer (единые).
- Преимущества (карточки).
- CTA.
- FAQ (аккордеон).

### 3.8) `privacy.html`

- Sticky Header / Footer (единые).
- Текст политики конфиденциальности.

### 3.9) UI Kit страницы

- `ui-kit-typography.html`: палитра/типографика/кнопки/икон-кнопки/поля.
- `ui-kit-components.html`: примеры header/footer, mixed-grid, таблица в `.table-wrapper`.
- `ui-kit-blocks.html`: набор блоков (услуги/процесс/FAQ/форма) с едиными токенами/кнопками.

## 4) Соответствие ТЗ (кратко)

Обозначения: OK соответствует, PARTIAL частично/демо, MISSING отсутствует.

| Требование | Статус | Где реализовано | Комментарий |
|---|---:|---|---|
| Многостраничность + единый Sticky Header | OK | все канонические страницы | Единый header с бургером и активным состоянием ссылки. |
| Sticky + glassmorphism при скролле | OK | все канонические страницы | `.glass-nav` (blur + прозрачность). |
| CTA “Рассчитать стоимость” | OK | header | Ведет на `contacts.html#contact-form`. |
| CTA “Написать в Telegram” + контакты в header | OK | все канонические страницы | Primary CTA + быстрые контакты (tel/mail), в моб. меню дублируются. |
| Главная: Hero + услуги + процесс + FAQ | OK | `index.html` | Видео не используется (изображение). |
| Портфолио: Mixed Grid + фильтры без перезагрузки | OK | `portfolio.html` | Фильтрация реализована через классы + `hidden`. |
| Кейс: Before/After slider | OK | `case.html`, превью в `portfolio.html` | Реализовано через pointer events. |
| Контакты: форма + карта + прямые контакты | PARTIAL | `contacts.html` | Карта/endpoint конфигурируются через `<meta>`, по умолчанию безопасные заглушки. |
| Footer: копирайт + Privacy + Offer | OK | все канонические страницы | `privacy.html` + `offer.html`. |
| Иконки только SVG | MISSING | — | Сейчас используются Material Icons (икон-шрифты/символы). |
| Lazy loading + WebP/AVIF | PARTIAL | `index.html`, `services.html` | Форматы/ленивая загрузка не унифицированы (изображения в основном внешние). |

## 5) Чеклист качества (по текущим страницам)

### 5.1) HTML

- Семантика: OK (используются `header/nav/main/section/footer`).
- Inline `<style>`/inline `style=""`/inline JS: OK (на канонических страницах нет).
- Формы: OK (`contacts.html`).
- Кнопки/ссылки: OK (корректные `href`, у `button` задан `type` в формах и UI kit примерах).

### 5.2) CSS

- Токены: OK (`assets/site.css`, Tailwind colors через CSS vars).
- Глобальные переопределения (`div {}`): OK (в `assets/site.css` нет).
- Hover/Focus/Disabled: OK (в `assets/site.css`).
- Таблицы: OK (в UI kit примере таблица обернута в `.table-wrapper`).
- Статистика: OK (контейнеры метрик размечены `.stat-cards`).

### 5.3) JS

- Весь код в отдельных файлах: OK (`assets/site.js`).
- Инициализация на `DOMContentLoaded`: OK.
- Переключение компонентов через классы: OK (`hidden`, `is-open`, `is-active`).

### 5.4) Адаптив

- Брейкпоинты 320/768/1024/1440: OK (подтверждено авто-рендером, см. ниже).
- Touch: OK (бургер-меню, before/after slider на pointer events).

## 6) Авто-рендер и логи браузера

Скрипт: `scripts/render-pages.js` (Playwright). Документация: `docs/render_pages.md`.

Последняя проверка (с игнором предупреждения Tailwind CDN):

```bash
node scripts/render-pages.js --out renders/after-docx-gapfix --ignore-tailwind-cdn-warning --fail-on-warn
```

Результат: `consoleErrors=0`, `consoleWarnings=0`, `pageErrors=0`, `requestFailures=0`, `httpErrors=0`.  
Отчет: `renders/after-docx-gapfix/report.json`.
