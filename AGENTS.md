# SCAN.LAB: Инструкции для агентов

Этот репозиторий содержит статические HTML-страницы SCAN.LAB, общий UI kit и скрипт проверки (рендер + browser logs). Любые правки делай так, чтобы страницы оставались унифицированными и проверяемыми.

## Источники правды

- Требования: `docs/scanlab_tz.md`
- Унификация и UI kit: `docs/scanlab_unification.md`
- Инвентаризация “как есть”: `docs/scanlab_inventory_current.md`
- QA (рендеры + логи): `docs/render_pages.md`

## Правила изменений (обязательные)

- Не добавлять inline `<style>`, `style="..."`, inline `<script>`.
- Общие стили/токены/интерактив: только через `assets/site.css`, `assets/tailwind-config.js`, `assets/site.js`.
- Header/Footer должны быть одинаковыми на всех канонических страницах.
- Интерактивные элементы:
  - `button` должен иметь корректный `type`
  - икон-кнопки должны иметь `aria-label`
  - формы: `label` + `placeholder` + `aria-*`

## Проверка перед сдачей

```bash
node scripts/render-pages.js --out renders/scanlab --fail-on-warn --ignore-tailwind-cdn-warning
```

Цель: `consoleErrors=0`, `pageErrors=0`, `requestFailures=0`, `httpErrors=0` (warnings либо 0, либо согласованный allow-list).

## Skill (для Codex)

Если доступны skills, используй `scanlab-mockup-to-site`:

- Skill: `$scanlab-mockup-to-site`
- Файл: `/home/getcher/.codex/skills/scanlab-mockup-to-site/SKILL.md`

Он описывает полный пайплайн: “множественные `code.html` -> единый сайт”, унификацию UI kit, чеклисты и методику добавления новых страниц.

