# SCAN.LAB: Авто-рендер страниц + логи браузера

Скрипт: `scripts/render-pages.js` (Playwright).

## Зачем

- Снять скриншоты страниц на брейкпоинтах `320/768/1024/1440`.
- Собрать системные ошибки браузера: `pageerror`, `requestfailed`, HTTP `4xx/5xx`, `console.error/warn`.

## Запуск

Из корня репозитория:

```bash
node scripts/render-pages.js
```

Рендер одной страницы:

```bash
node scripts/render-pages.js index.html
```

Папка вывода (по умолчанию `renders/scanlab`):

```bash
node scripts/render-pages.js --out renders/scanlab
```

Опции:

- `--breakpoints 320,768,1024,1440`
- `--no-fullpage` (без `fullPage` скриншотов)
- `--fail-on-warn` (делает прогон “падающим”, если есть warnings)
- `--ignore-tailwind-cdn-warning` (не считает предупреждение Tailwind CDN в totals, но продолжает писать его в `browser.jsonl` с `ignored: true`)

## Результаты

- Сводка: `renders/scanlab/report.json`
- По каждой странице: `renders/scanlab/<page-slug>/`
  - Скриншоты: `<page-slug>-<width>.png`
  - Логи: `browser.jsonl`
  - Метаданные: `summary.json`

## Примечание про Tailwind CDN

Если страницы подключают `cdn.tailwindcss.com`, Tailwind пишет предупреждение в консоль (“should not be used in production”). Это не runtime-ошибка, но будет виден в `consoleWarnings`.

