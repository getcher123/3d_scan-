# SCAN.LAB: Документ унификации (UI Kit v1)

Дата: 2026-02-16  
Репозиторий: `/mnt/c/3d_scan`

## 1) Цель и охват

- Привести все страницы к единому визуальному языку UI kit: фон, типографика, поверхности, меню (header), футер.
- Убрать page-specific стили и конфиги и оставить один общий источник стилей/токенов/поведения.
- Зафиксировать правила, по которым добавляются новые страницы и блоки.

## 2) Единые источники (Single Source of Truth)

- Токены и общие CSS-хелперы: `assets/site.css`
- Единый Tailwind CDN config (цвета/шрифты через CSS vars с поддержкой opacity): `assets/tailwind-config.js`
- Единый JS для интерактива: `assets/site.js`

Правило: на всех “живых” страницах подключаем только эти общие файлы. Inline `<style>`, inline `style=""` и inline-конфиги Tailwind (`<script id="tailwind-config">`) не используем.

## 3) Токены UI Kit

Истина по палитре лежит в `assets/site.css` (`:root`).

- Accent (Electric Blue): `--color-primary` (`#0066ff`)
- Background (Deep Black): `--color-background-dark` (`#0a0a0a`)
- Surfaces:
- `--color-surface-card` (карточки)
- `--color-surface-dark` (крупные секции/подложки)
- `--color-surface-lighter` (подсветки/вторичные поверхности)
- Status:
- `--color-success`, `--color-error`

Tailwind-классы используют `rgb(var(--...-rgb) / <alpha-value>)`, поэтому корректно работают варианты с прозрачностью: `bg-primary/10`, `bg-surface-card/80` и т.д.

## 4) Типографика

- Body: `font-body` (Inter)
- Display (H1-H3 и ключевые заголовки карточек): `font-display` (Space Grotesk)
- Mono (тех. подписи/метки): `font-mono` (Roboto Mono)

Правило: любые `h1/h2/h3` на страницах должны явно включать `font-display`, кроме “технических” заголовков-меток (где осознанно используется `font-mono`).

## 5) Общий каркас страницы

Минимальные требования к любой новой странице:

- Подключения в `<head>`:
- Tailwind CDN
- `assets/tailwind-config.js`
- шрифты (Space Grotesk + Inter + Roboto Mono)
- `assets/site.css`
- `<body>`:
- `class="bg-background-dark text-white font-body antialiased selection:bg-primary selection:text-white"`
- (опционально) `data-page="services|process|portfolio|contacts|case|home"`
- Общие компоненты:
- Header: sticky + `.glass-nav`
- Footer: единый шаблон (`bg-surface-card`, ссылки на основные страницы, контакты)
- Внизу страницы: `assets/site.js`

## 6) Компоненты: Header и Footer

Каноническая реализация:

- Header: `index.html` (блок `<header ... class="... glass-nav">`)
- Footer: `index.html` (блок `<footer ... class="... bg-surface-card">`)

Контракт header:

- Кнопка бургер-меню: `[data-menu-button]` + `aria-expanded`
- Контейнер мобильного меню: `[data-menu]` (по умолчанию `hidden`)
- Навигационные ссылки: `.ui-nav-link` + `data-nav="services|process|portfolio|contacts"`
- CTA “Рассчитать стоимость”: `.ui-btn ui-btn--primary ...` (ссылка `contacts.html#contact-form`)

Контракт footer:

- Фон: `bg-surface-card`
- Центр: ссылки на `services.html`, `process.html`, `portfolio.html`, `contacts.html`
- Справа: контактные иконки (Telegram + Email) и копирайт

## 7) JS: единый интерактив

Весь интерактив инициализируется в `assets/site.js` на `DOMContentLoaded`.

- Mobile menu:
- открытие/закрытие через добавление/удаление классов (`hidden`, `is-open`)
- Active nav:
- подсветка по `body[data-page]` и ссылкам `[data-nav="..."]`
- для `data-page="case"` подсвечивается `portfolio`
- подсветка реализована через `aria-current="page"` (визуализация в CSS на `.ui-nav-link[aria-current="page"]`)
- Portfolio filters:
- контейнер `[data-portfolio]`, кнопки `[data-filter]`, карточки `[data-card][data-category]`
- Before/After slider:
- контейнер `[data-ba]`, слои `[data-ba-before]`, ручка `[data-ba-handle]`
- CSS для слайдера: `assets/site.css` (`.js-ba`, `.js-ba-before`, `.js-ba-handle`)

## 8) Правила (ревизия стилей)

- Запрещено:
- inline `<style>`
- inline `style="..."`
- inline `<script id="tailwind-config">...</script>`
- дублирование токенов/палитры на уровне отдельных страниц
- Рекомендуется:
- карточки и блоки: `bg-surface-card` + `border border-white/10`
- крупные подложки: `bg-surface-dark`
- для паттернов/фонов использовать классы из `assets/site.css` (например `.lidar-points`, `.pattern-*`), а не inline background-image

## 9) Компоненты интерактива (UI Kit)

Единые классы лежат в `assets/site.css` (раздел `Interactive (UI Kit)`).

- Навигация:
- Header links: `.ui-nav-link` + `data-nav="services|process|portfolio|contacts"` (active через `aria-current="page"`).
- Обычные ссылки (footer/breadcrumbs): `.ui-link`.
- Action links (“Смотреть кейс”, “Все услуги”): `.ui-action-link`.
- Inline links в тексте: `.ui-inline-link`.
- Кнопки:
- База: `.ui-btn`.
- Варианты: `.ui-btn--primary`, `.ui-btn--secondary`, `.ui-btn--ghost`.
- Размеры: `.ui-btn--sm`, `.ui-btn--md`, `.ui-btn--lg`, (опционально) `.ui-btn--caps`.
- Икон-кнопки:
- База: `.ui-icon-btn`.
- Размеры: `.ui-icon-btn--sm`, `.ui-icon-btn--md`.
- Фоны: `.ui-icon-btn--surface`, `.ui-icon-btn--card`.
- Состояния: `.ui-icon-btn--solid` (hover), `.ui-icon-btn--primary` (solid).
- Формы: `.ui-field`, `.ui-select`, `.ui-textarea`.
- Портфолио фильтры: `.filter-btn` + `.is-active` (JS переключает `aria-pressed`).

## 10) Чеклист качества (макеты)

HTML

- Семантичные теги (`header/nav/main/section/footer`), отсутствие inline-стилей/скриптов.
- Формы: у каждого поля есть `label`, `placeholder` и `aria-*`.
- Ссылки/кнопки: корректные `href`, `type`, `aria-label` (для икон-кнопок).

CSS

- Цвета/градиенты из токенов (CSS variables + Tailwind colors из `assets/tailwind-config.js`).
- Нет глобальных переопределений (`div {}` и т.п.).
- Состояния `:hover`, `:focus`, `:disabled` заданы через классы Tailwind/компоненты.
- Интерактив должен использовать единые классы: `.ui-btn`, `.ui-icon-btn`, `.ui-link/.ui-nav-link`, `.ui-action-link`, `.ui-inline-link`, `.ui-field/.ui-select/.ui-textarea`.

JS

- Весь код в `assets/site.js`, инициализация на `DOMContentLoaded`.
- Переключения через классы (`is-active`, `is-open`, `hidden`).

Адаптив

- Брейкпоинты 320/768/1024/1440: требуется ручная проверка в браузере (в коде используются responsive-классы Tailwind).
- Touch: бургер и drag (before/after) работают через pointer events.

## 11) Повторная проверка всех страниц (после унификации)

Ниже таблица для всех страниц в корне репозитория (кроме redirect-страниц).

| Page | Assets | Header | Footer | Body (bg+font) | H1-H3 typography | Inline style/script |
|---|---|---|---|---|---|---|
| `advantages-faq.html` | OK | OK | OK | OK | OK | OK |
| `case.html` | OK | OK | OK | OK | OK | OK |
| `contacts.html` | OK | OK | OK | OK | OK | OK |
| `index.html` | OK | OK | OK | OK | OK | OK |
| `portfolio.html` | OK | OK | OK | OK | OK | OK |
| `privacy.html` | OK | OK | OK | OK | OK | OK |
| `process.html` | OK | OK | OK | OK | OK | OK |
| `services.html` | OK | OK | OK | OK | OK | OK |
| `ui-kit-blocks.html` | OK | OK | OK | OK | OK | OK |
| `ui-kit-components.html` | OK | OK | OK | OK | OK | OK |
| `ui-kit-typography.html` | OK | OK | OK | OK | OK | OK |

## 12) Redirect map (наследие прототипов)

Старые прототипы в подпапках и алиасы в корне оставлены как redirect-страницы на канонические HTML в корне.

| Файл | Redirect → |
|---|---|
| `advantages-contact.html` | `contacts.html` |
| `workflow-portfolio.html` | `portfolio.html` |
| `process-portfolio.html` | `portfolio.html` |
| `3d_scan_services_hero_&_grid/code.html` | `../services.html` |
| `3d_scan_workflow_&_portfolio_1/code.html` | `../portfolio.html` |
| `3d_scan_workflow_&_portfolio_2/code.html` | `../portfolio.html` |
| `3d_scan_workflow_&_portfolio_3/code.html` | `../process.html` |
| `3d_scan_advantages_&_contact_form_1/code.html` | `../contacts.html` |
| `3d_scan_advantages_&_contact_form_2/code.html` | `../advantages-faq.html` |
| `3d_scan_advantages_&_contact_form_3/code.html` | `../ui-kit-typography.html` |
| `3d_scan_advantages_&_contact_form_4/code.html` | `../ui-kit-components.html` |
| `3d_scan_advantages_&_contact_form_5/code.html` | `../ui-kit-blocks.html` |
| `детали_проекта_(кейс)/code.html` | `../case.html` |
