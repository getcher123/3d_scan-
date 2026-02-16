# SCAN.LAB (Static Site)

Статический многостраничный сайт для сервиса 3D-сканирования и 3D-печати **SCAN.LAB**. Репозиторий используется как “единый источник правды” для макетов, UI kit и проверки соответствия ТЗ.

## Структура проекта

- `*.html` в корне репозитория: канонические страницы сайта
- `assets/`: единый UI kit и общий интерактив
  - `assets/site.css` (токены, кнопки/ссылки/поля, состояния, обертки таблиц/статистики)
  - `assets/tailwind-config.js` (Tailwind CDN config на базе CSS variables)
  - `assets/site.js` (бургер-меню, активная ссылка, фильтры портфолио, before/after)
- `docs/`: требования и документация проекта
  - `docs/scanlab_tz.md` (ТЗ, источник правды)
  - `docs/scanlab_unification.md` (унификация и правила UI kit)
  - `docs/scanlab_inventory_current.md` (инвентаризация страниц/блоков и соответствие ТЗ)
  - `docs/render_pages.md` (рендер страниц + логи браузера)
- `scripts/`:
  - `scripts/render-pages.js` (Playwright: скриншоты 320/768/1024/1440 + browser logs)
- `renders/`: артефакты рендера (в `.gitignore`)
- подпапки `3d_scan_*/*code.html` и `детали_проекта_(кейс)/code.html`: наследие ранних прототипов (оставлены как redirect-страницы на канонические HTML)

## Канонические страницы

- `index.html` (Главная)
- `services.html` (Услуги)
- `process.html` (Процесс)
- `portfolio.html` (Портфолио)
- `case.html` (Кейс)
- `contacts.html` (Контакты)
- `advantages-faq.html` (Преимущества + FAQ)
- `privacy.html` (Политика конфиденциальности)
- UI kit:
  - `ui-kit-typography.html`
  - `ui-kit-components.html`
  - `ui-kit-blocks.html`

## Проверка страниц (скриншоты + логи)

Запуск из корня репозитория:

```bash
node scripts/render-pages.js --out renders/scanlab
```

Строгий режим (падает, если остались warnings):

```bash
node scripts/render-pages.js --out renders/scanlab --fail-on-warn --ignore-tailwind-cdn-warning
```

Отчет: `renders/scanlab/report.json`

## Конвертация ТЗ из DOCX в Markdown

В проект перенесен скрипт `scripts/docx2md.sh` (требует `pandoc` в `PATH`).

Пример:

```bash
scripts/docx2md.sh "input/ТЗ.docx" "docs/tz_from_docx.md"
```

## Как создать новую страницу (кратко)

1. Выбрать ближайшую страницу-основу и скопировать файл (например `services.html`).
2. Переименовать в новый канонический файл в корне (например `about.html`).
3. Проверить обязательные подключения (без inline):
   - Tailwind CDN + `assets/tailwind-config.js`
   - шрифты
   - `assets/site.css`
   - внизу страницы `assets/site.js`
4. Проставить `data-page="..."` в `<body>` (для активной ссылки в меню).
5. Header/Footer: использовать каноническую разметку (ориентир: `index.html`). Если добавляете новый пункт меню, синхронизируйте header/footer на всех страницах.
6. Использовать UI kit классы для интерактивов:
   - кнопки: `.ui-btn ...`
   - ссылки: `.ui-link/.ui-nav-link/.ui-action-link/.ui-inline-link`
   - поля: `.ui-field/.ui-select/.ui-textarea`
   - таблицы: `.table-wrapper`
   - метрики/статистика: `.stat-cards` / `.weekly-stats`
7. Прогнать `scripts/render-pages.js` на 320/768/1024/1440 и проверить `report.json`.
8. Обновить документацию:
   - минимум: `docs/scanlab_inventory_current.md`
   - если добавились новые правила/компоненты: `docs/scanlab_unification.md`
   - если менялись требования: `docs/scanlab_tz.md`
