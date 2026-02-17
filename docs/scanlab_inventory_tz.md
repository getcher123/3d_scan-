# SCAN.LAB: инвентаризация страниц и соответствие ТЗ

Дата инвентаризации: 2026-02-16<br>
Ревизия репозитория: `7a5fc19`

Примечание (актуально на 2026-02-17): в объединенной версии сайта (канонические страницы в корне) глобальная навигация сокращена до «Портфолио» и «Контакты». Страницы `services.html` и `process.html` остаются в проекте, но не входят в глобальное меню, так как их контент дублируется на главной странице.

## 1) Что сейчас в репозитории

- В корне лежат 10 подпапок, каждая содержит статический прототип `code.html` и рендер `screen.png`.
- Сборки/роутинга/общих компонентов нет: все прототипы самостоятельные HTML-страницы.
- Во всех прототипах Tailwind подключен через CDN (`https://cdn.tailwindcss.com`), большая часть изображений и текстур берется по внешним URL.

## 2) Инвентаризация страниц (все имеющиеся `code.html`)

### 2.1) Услуги + Hero

- Файл: `3d_scan_services_hero_&_grid/code.html`
- Скриншот: `3d_scan_services_hero_&_grid/screen.png`
- Блоки: Sticky header (glassmorphism, CTA, mobile menu); Hero (H1, UTP, 2 CTA, стат-блоки, hero image-card); Услуги (grid 4 карточки с иконкой/описанием/ценой); Footer.
- Соответствие ТЗ (крупно): PARTIAL (структура hero+services есть, но бренд/палитра/типографика отличаются от ТЗ; нет “Процесс”, нет видео, иконки не SVG).

### 2.2) Процесс + Портфолио (вариант 1)

- Файл: `3d_scan_workflow_&_portfolio_1/code.html`
- Скриншот: `3d_scan_workflow_&_portfolio_1/screen.png`
- Блоки: Sticky header SCAN.LAB (Услуги/Процесс/Портфолио/Контакты, CTA); Intro/Hero (точность до 0.05мм, 8K); “Наш процесс” (таймлайн 7 шагов); “Избранные проекты” (кнопки-фильтры, mixed grid, карточки со сравнением “до/после”); Footer.
- Соответствие ТЗ (крупно): PARTIAL (шаги процесса совпадают; портфолио и фильтры визуально есть, но фильтрация не реализована; сравнение “до/после” статичное, без drag-логики).

### 2.3) Портфолио (вариант 2, bento grid)

- Файл: `3d_scan_workflow_&_portfolio_2/code.html`
- Скриншот: `3d_scan_workflow_&_portfolio_2/screen.png`
- Блоки: Sticky header SCAN.LAB; Заголовок и описание; Фильтры (pills); KPI/статистика; Mixed Grid (2x2 hero, 1x1, 1x2); CTA “Загрузить еще”; Footer (ссылки).
- Соответствие ТЗ (крупно): PARTIAL (тип сетки соответствует; фильтрация/“Смотреть кейс” не реализованы как функционал/оверлей; категории фильтров не 1:1 с ТЗ).

### 2.4) Процесс (без портфолио)

- Файл: `3d_scan_workflow_&_portfolio_3/code.html`
- Скриншот: `3d_scan_workflow_&_portfolio_3/screen.png`
- Блоки: Sticky header SCAN.LAB; Intro/Hero; “Наш процесс” (таймлайн 7 шагов); Footer.
- Соответствие ТЗ (крупно): OK/PARTIAL (процессовый блок соответствует по структуре и шагам; остальное зависит от интеграции в “Главную”).

### 2.5) Контакты (форма + контакты + карта, вариант 1)

- Файл: `3d_scan_advantages_&_contact_form_1/code.html`
- Скриншот: `3d_scan_advantages_&_contact_form_1/screen.png`
- Блоки: Sticky header (CTA “Написать в Telegram”); Контакты (телефон/email/telegram); “Карта” (визуальная заглушка локации); Форма (имя, контакт, тип услуги dropdown, описание проекта, submit); Footer (соц.иконки, часы работы).
- Соответствие ТЗ (крупно): PARTIAL (страница контактов есть, но карта без реального embed; бренд/CTA отличаются от ТЗ; иконки не SVG).

### 2.6) Преимущества + CTA + FAQ (без контактов)

- Файл: `3d_scan_advantages_&_contact_form_2/code.html`
- Скриншот: `3d_scan_advantages_&_contact_form_2/screen.png`
- Блоки: “Почему выбирают нас” (4 карточки преимуществ); CTA-блок (консультация/ТЗ); FAQ (accordion на `<details>`); Header/Footer.
- Соответствие ТЗ (крупно): PARTIAL (FAQ реализован; блок преимуществ можно трактовать как часть “О компании”, но в ТЗ он не описан явно; нет единой интеграции в “Главную”).

### 2.7) UI Kit: типографика, палитра, кнопки, формы

- Файл: `3d_scan_advantages_&_contact_form_3/code.html`
- Скриншот: `3d_scan_advantages_&_contact_form_3/screen.png`
- Блоки: Typography; Color Palette (включая Electric Blue `#0066FF` и canvas `#0A0A0A`); Buttons; Iconography; Inputs & Forms (input, focus, dropdown, textarea); примеры мелких компонентов.
- Соответствие ТЗ (крупно): PARTIAL (палитра и формы близко к ТЗ; в демонстрации заголовки “display” на Space Grotesk, а в ТЗ для H1-H3 указан Inter/Roboto).

### 2.8) UI Kit: компоненты навигации, сетки портфолио, детали кейса

- Файл: `3d_scan_advantages_&_contact_form_4/code.html`
- Скриншот: `3d_scan_advantages_&_contact_form_4/screen.png`
- Блоки: примеры sticky header/footer; варианты portfolio grid; “Detail View Components” (comparison slider, таблица тех.параметров).
- Соответствие ТЗ (крупно): PARTIAL (компоненты под ТЗ есть как макеты; интерактив слайдера не реализован).

### 2.9) UI Kit: специфичные блоки (услуги/процесс/FAQ/визуализация/форма)

- Файл: `3d_scan_advantages_&_contact_form_5/code.html`
- Скриншот: `3d_scan_advantages_&_contact_form_5/screen.png`
- Блоки: варианты карточек услуг с ценами; “Процесс работы” (7 шагов в другой формулировке); FAQ-аккордеон (визуальные состояния); “Визуализация данных”; “Форма связи (Full)” (включая upload-зону).
- Соответствие ТЗ (крупно): PARTIAL (все нужные типы блоков присутствуют, но это UI-kit страница; шаги процесса по смыслу совпадают, формулировки отличаются).

### 2.10) Детали проекта (кейс)

- Файл: `детали_проекта_(кейс)/code.html`
- Скриншот: `детали_проекта_(кейс)/screen.png`
- Блоки: Sticky header; Breadcrumbs; Case intro; Sticky sidebar “Параметры проекта”; Before/After (comparison) slider; описание процесса; “Технические детали” (оборудование/ПО); галерея результатов; “Другие проекты”; Footer; фиксированный CTA “Обсудить проект в Telegram”.
- Соответствие ТЗ (крупно): PARTIAL (структура страницы кейса соответствует; comparison slider визуально есть, но без drag-логики; параметры проекта частично в сайдбаре, оборудование вынесено отдельным блоком).

## 3) Соответствие ТЗ (матрица)

Обозначения: OK соответствует, PARTIAL частично/макет, MISSING отсутствует.

### 3.1) Структура сайта и навигация

| Требование ТЗ | Статус | Где видно | Комментарий |
|---|---:|---|---|
| Многостраничное решение + единый Sticky Header | PARTIAL | почти во всех прототипах | Header есть, но нет единой кодовой базы/компонента и единых ссылок/роутинга. |
| Header: Logo SCAN.LAB (SVG) | MISSING | — | Везде текст/иконка Material, SVG-логотипа нет. |
| Header: ссылки “Услуги, Процесс, Портфолио, Контакты” | PARTIAL | `3d_scan_workflow_&_portfolio_1/code.html`, `3d_scan_workflow_&_portfolio_2/code.html` | В части файлов есть “О нас” вместо “Процесс”. В канонических страницах меню сокращено (см. примечание выше). |
| CTA “Рассчитать стоимость” (Electric Blue) | PARTIAL | `3d_scan_workflow_&_portfolio_1/code.html`, `3d_scan_workflow_&_portfolio_2/code.html` | Текст/цвет/бренд расходятся между страницами. |
| Sticky + glassmorphism при скролле | OK/PARTIAL | большинство файлов | Визуально реализовано через `backdrop-blur` и полупрозрачный фон. |

### 3.2) Главная страница (лендинг)

| Требование ТЗ | Статус | Где видно | Комментарий |
|---|---:|---|---|
| Hero: H1 + УТП + видео/изображение | PARTIAL | `3d_scan_services_hero_&_grid/code.html`, `3d_scan_workflow_&_portfolio_1/code.html` | Видео нет, используются внешние изображения. |
| Hero: стат-плашки “Точность до 0.05мм”, “Разрешение 8K” | OK/PARTIAL | `3d_scan_workflow_&_portfolio_1/code.html` | В `3d_scan_services_hero_&_grid/code.html` значения другие. |
| Услуги: grid из 4 карточек (иконка/заголовок/описание/“от…”) | OK | `3d_scan_services_hero_&_grid/code.html` | Иконки не SVG (Material Icons). |
| О компании (как отдельный блок) | PARTIAL | `3d_scan_advantages_&_contact_form_2/code.html` | Есть блок “Почему выбирают нас”, но это не прямой “О компании” и он не интегрирован в “Главную”. |
| Процесс: таймлайн 7 шагов (как в ТЗ) | OK | `3d_scan_workflow_&_portfolio_1/code.html`, `3d_scan_workflow_&_portfolio_3/code.html` | В `3d_scan_advantages_&_contact_form_5/code.html` шаги по смыслу близки, но формулировки другие. |
| FAQ | OK | `3d_scan_advantages_&_contact_form_2/code.html` | Реализовано на `<details>`; анимации/стили можно унифицировать. |

### 3.3) Портфолио

| Требование ТЗ | Статус | Где видно | Комментарий |
|---|---:|---|---|
| Фильтрация без перезагрузки (типы: Архитектура/Промышленность/Искусство/Авто) | PARTIAL | `3d_scan_workflow_&_portfolio_2/code.html` | Есть кнопки/пилюли, но нет JS/CSS-логики фильтрации; “Авто” отсутствует, есть “Музей”. |
| Mixed Grid: hero 2x2, стандарт 1x1, вертикальная 1x2 | OK | `3d_scan_workflow_&_portfolio_2/code.html` | Сетка соответствует “bento” паттерну, присутствуют разные спаны. |
| Hover: кнопка “Смотреть кейс” + glow границ | PARTIAL | `3d_scan_workflow_&_portfolio_2/code.html` | Glow/hover присутствуют, явной CTA “Смотреть кейс” в оверлее нет. |

### 3.4) Страница кейса (Case Study)

| Требование ТЗ | Статус | Где видно | Комментарий |
|---|---:|---|---|
| Before/After slider | PARTIAL | `детали_проекта_(кейс)/code.html` | Визуально есть, но отсутствует JS для перетаскивания (ширина фиксирована). |
| Сайдбар с параметрами (Заказчик/Срок/Точность/Оборудование) | PARTIAL | `детали_проекта_(кейс)/code.html` | Заказчик/Срок/Точность есть; оборудование вынесено отдельным блоком ниже. |
| CTA “Заинтересовал проект?” + кнопка в Telegram | OK | `детали_проекта_(кейс)/code.html` | Реализовано как фиксированный нижний CTA-бар. |

### 3.5) Контакты

| Требование ТЗ | Статус | Где видно | Комментарий |
|---|---:|---|---|
| Форма обратной связи | OK | `3d_scan_advantages_&_contact_form_1/code.html` | Поля и dropdown присутствуют, без интеграции отправки. |
| Карта | PARTIAL | `3d_scan_advantages_&_contact_form_1/code.html` | Сейчас декоративная заглушка, не embed. |
| Прямые контакты | OK | `3d_scan_advantages_&_contact_form_1/code.html` | Телефон/email/Telegram есть. |

### 3.6) UI Kit (типографика/цвета/формы)

| Требование ТЗ | Статус | Где видно | Комментарий |
|---|---:|---|---|
| Typography: H1-H3 Inter/Roboto 700, текст Inter 400 | PARTIAL | `3d_scan_advantages_&_contact_form_3/code.html` | Inter/Roboto подключены; но “display” в примерах на Space Grotesk. |
| Палитра: Background `#0A0A0A`, Surface `#1A1A1A`, Accent `#0066FF`, Lines `#2E2E2E` | PARTIAL | `3d_scan_advantages_&_contact_form_3/code.html` | Accent/Background совпадают; значения Surface/Lines расходятся между прототипами и не унифицированы. |
| Inputs: темный фон, тонкая рамка, фокус-свечение | OK | `3d_scan_advantages_&_contact_form_3/code.html`, `3d_scan_advantages_&_contact_form_1/code.html` | Реализовано через `focus:ring`/границы. |
| Dropdown: стилизованный под тему | OK | `3d_scan_advantages_&_contact_form_1/code.html`, `3d_scan_advantages_&_contact_form_3/code.html` | Есть визуальная кастомизация. |
| Кнопки Primary/Secondary | OK | `3d_scan_advantages_&_contact_form_3/code.html`, `3d_scan_services_hero_&_grid/code.html` | Есть варианты primary/secondary/ghost. |

### 3.7) Технические требования и контент

| Требование ТЗ | Статус | Где видно | Комментарий |
|---|---:|---|---|
| Адаптивность (desktop/tablet/mobile) | OK/PARTIAL | большинство файлов | Tailwind responsive-классы используются; нужна проверка “в сборке” (сейчас только статика). |
| Fade-in при скролле | MISSING | — | В прототипах есть hover и `animate-*`, но нет scroll-reveal логики. |
| Микро-взаимодействия на hover | OK | большинство файлов | Hover/transition/translate/box-shadow активно используются. |
| Оптимизация изображений (WebP/AVIF), lazy loading | MISSING | — | Используются внешние изображения; `loading="lazy"` не задан, форматы не контролируются. |
| Иконки только SVG | MISSING | — | Используются Material Icons/Material Symbols (икон-шрифты). |
| Русский язык / UTF-8 | OK | все `code.html` | `lang="ru"` + русский текст. |

## 4) Ключевые расхождения, которые мешают “собрать” сайт по ТЗ

- Нет единого “склеенного” набора страниц (единый Header/Footer, единая палитра/типографика/бренд, реальные ссылки между страницами).
- Интерактивные требования из ТЗ в основном показаны как статические макеты: фильтрация портфолио, before/after slider.
- Визуальный стиль не унифицирован: встречаются разные бренды (“VoxelScan”, “ScanTech”, “SCAN.LAB”, “3D SCAN LAB”) и разные основные цвета (`#135bec` vs `#0066FF`).
- Требование “иконки только SVG” не соблюдено (везде икон-шрифты Material).
- Требования по производительности (WebP/AVIF, lazy) не реализованы на уровне кода прототипов.

## 5) Чеклист соответствия макетов (HTML/CSS/JS/Адаптив)

Ниже чеклист из требований к качеству реализации макетов и прогон по каждому `code.html`.

Обозначения:

- OK: соответствует
- PARTIAL: частично соответствует
- MISSING: не соответствует
- N/A: неприменимо к данному макету (например, нет форм/таблиц)
- UNVERIFIED: не проверялось фактически (нужен прогон в браузере/автотест)

### 5.1) Чеклист

| ID | Раздел | Требование |
|---|---|---|
| H1 | HTML | Семантичные теги, BEM-нейминг, отсутствие inline-стилей/скриптов (включая `<style>`, inline `style=""`, inline `<script>`). |
| H2 | HTML | Все формы имеют `label`/`placeholder`/`aria-*` атрибуты. |
| H3 | HTML | Ссылки/кнопки имеют корректные `href`, `type`, `aria-label` (для икон-кнопок). |
| C1 | CSS | Цвета/градиенты из CSS-переменных (`--gradient-bg`, `--color-primary`, и т.д.). |
| C2 | CSS | Никаких глобальных переопределений (`div {}`, `* {}`, и т.п.). |
| C3 | CSS | Состояния `:hover`, `:focus`, `:disabled` прописаны для интерактивных элементов. |
| C4 | CSS | Таблицы оборачиваются в `.table-wrapper`, статистика оформляется через `.stat-cards`/`.weekly-stats` (где применимо). |
| J1 | JS | Весь код в отдельных файлах, инициализация на `DOMContentLoaded`. |
| J2 | JS | Компоненты переключаются через добавление/удаление классов (`is-active`, `is-open`). |
| R1 | Адаптив | Проверены брейкпоинты 320/768/1024/1440 (можно приложить скриншоты). |
| R2 | Адаптив | Бургер-меню, модальные окна и табы работают на touch (где применимо). |

### 5.2) Результаты по макетам

#### 5.2.1) `3d_scan_services_hero_&_grid/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | Семантика есть (`nav/section/footer`), но BEM отсутствует (Tailwind utility-классы). В `<head>` есть inline `<style>` и inline `<script>` (tailwind.config), есть inline `style=""` в разметке. |
| H2 | N/A | Форм нет. |
| H3 | PARTIAL | Есть `href="#"` плейсхолдеры; не у всех `<button>` задан `type`. `aria-*` встречается точечно (например `aria-current`, sr-only для меню). |
| C1 | MISSING | CSS-переменные не используются (цвета/градиенты заданы через Tailwind-конфиг и утилити-классы). |
| C2 | OK | Нет глобальных правил вида `div {}`/`* {}`. |
| C3 | PARTIAL | `hover`/`focus` состояния заданы, `:disabled` не определено. |
| C4 | MISSING | Стат-блоки не оформлены через `.stat-cards`/`.weekly-stats`. |
| J1 | MISSING | Внешних JS-файлов нет; есть только inline-конфиг Tailwind. |
| J2 | MISSING | Нет логики переключения компонентов через классы (например, меню). |
| R1 | UNVERIFIED | Используются `md:`/`lg:` классы, но прогон 320/768/1024/1440 не зафиксирован. |
| R2 | MISSING | Бургер-кнопка есть, но без JS (меню не раскрывается). |

#### 5.2.2) `3d_scan_workflow_&_portfolio_1/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | Семантика есть (`nav/main/section/footer`), BEM отсутствует. В `<head>` есть inline `<style>` и inline `<script>` (tailwind.config). |
| H2 | N/A | Форм нет. |
| H3 | PARTIAL | Много `href="#"`; у кнопок нет явного `type`. |
| C1 | MISSING | Нет CSS-переменных для цветов/градиентов. |
| C2 | OK | Кастомный CSS через классы; нет `div {}`/`* {}`. |
| C3 | PARTIAL | `hover` состояния есть, `:disabled` не задано. |
| C4 | MISSING | Стат-плашки/метрики не через `.stat-cards`/`.weekly-stats`. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | Нет class-toggle для фильтров/слайдера/меню. |
| R1 | UNVERIFIED | Responsive-классы есть, но нет фиксации проверки 320/768/1024/1440. |
| R2 | MISSING | На mobile навигация скрыта (`hidden md:flex`), бургер/мобильное меню отсутствует. |

#### 5.2.3) `3d_scan_workflow_&_portfolio_2/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | Семантика есть, BEM отсутствует. В `<head>` inline `<style>` и inline `<script>`. |
| H2 | N/A | Форм нет. |
| H3 | PARTIAL | Встречается `href="#"`; у кнопок нет явного `type`. |
| C1 | MISSING | Цвета/градиенты не через CSS variables. |
| C2 | OK | Нет глобальных переопределений вида `div {}`/`* {}`. |
| C3 | PARTIAL | `hover`/`focus` есть, `:disabled` не описано. |
| C4 | MISSING | KPI/статистика не оформлена через `.stat-cards`/`.weekly-stats`. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | Фильтрация/“load more”/ховеры не реализованы через class-toggle. |
| R1 | UNVERIFIED | Responsive-классы есть, но проверка брейкпоинтов не выполнена/не задокументирована. |
| R2 | MISSING | На mobile навигация скрыта, бургер/мобильное меню отсутствует. |

#### 5.2.4) `3d_scan_workflow_&_portfolio_3/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | Семантика есть, BEM отсутствует. В `<head>` inline `<style>` и inline `<script>`. |
| H2 | N/A | Форм нет. |
| H3 | PARTIAL | `href="#"` и кнопки без явного `type`. |
| C1 | MISSING | Нет CSS variables для палитры/градиентов. |
| C2 | OK | Нет глобальных переопределений вида `div {}`/`* {}`. |
| C3 | PARTIAL | `hover` есть, `:disabled` нет. |
| C4 | MISSING | Стат-плашки/метрики не через `.stat-cards`/`.weekly-stats`. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | Нет class-toggle компонентов. |
| R1 | UNVERIFIED | Responsive-классы есть, но проверка 320/768/1024/1440 не зафиксирована. |
| R2 | MISSING | На mobile навигация скрыта, бургер/мобильное меню отсутствует. |

#### 5.2.5) `3d_scan_advantages_&_contact_form_1/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | Семантика есть (`header/main`), BEM отсутствует. В `<head>` inline `<style>` и inline `<script>`. |
| H2 | PARTIAL | `label`/`placeholder` есть, `aria-*` у полей отсутствуют. |
| H3 | PARTIAL | Есть `href="#"`; мобильная кнопка меню без `aria-label`/sr-only текста; не все интерактивные элементы явно размечены (например “карта” как декоративный блок). |
| C1 | MISSING | Нет CSS variables для палитры. |
| C2 | PARTIAL | Есть глобальные стили скроллбара (`::-webkit-scrollbar*`). |
| C3 | PARTIAL | `hover`/`focus` состояния заданы, `:disabled` не задано. |
| C4 | N/A | Таблиц/стат-блоков нет. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | Бургер/компоненты не переключаются через классы. |
| R1 | UNVERIFIED | Responsive-классы есть, но проверка брейкпоинтов не выполнена/не задокументирована. |
| R2 | MISSING | Есть бургер-кнопка, но нет JS, меню не раскрывается. |

#### 5.2.6) `3d_scan_advantages_&_contact_form_2/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | Семантика есть (`header/main/section/footer`), BEM отсутствует. В `<head>` inline `<style>` и inline `<script>`. |
| H2 | N/A | Форм нет. |
| H3 | PARTIAL | `href="#"`; бургер-кнопка без `aria-label`/sr-only текста. |
| C1 | MISSING | Нет CSS variables для палитры. |
| C2 | PARTIAL | Есть глобальные стили скроллбара (`::-webkit-scrollbar*`). |
| C3 | PARTIAL | `hover`/`open` состояния у FAQ есть (через `<details>`), `:disabled` не задано. |
| C4 | N/A | Таблиц/стат-блоков нет. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | Навигация/бургер не переключаются через классы. |
| R1 | UNVERIFIED | Responsive-классы есть, но проверка брейкпоинтов не зафиксирована. |
| R2 | MISSING | FAQ работает на touch (нативный `<details>`), но бургер/меню не работает. |

#### 5.2.7) `3d_scan_advantages_&_contact_form_3/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | UI Kit страница: BEM отсутствует, есть inline `<style>` и inline `<script>`. |
| H2 | PARTIAL | Поля/лейблы/placeholder есть, `aria-*` отсутствуют. |
| H3 | PARTIAL | Есть `href="#"`; у кнопок нет явного `type` (в UI kit это критично при переносе в формы). |
| C1 | MISSING | Цвета не через CSS variables. |
| C2 | PARTIAL | Есть глобальные стили скроллбара (`::-webkit-scrollbar*`). |
| C3 | PARTIAL | `hover`/`focus` состояния показаны, `:disabled` нет. |
| C4 | N/A | Таблиц/стат-блоков нет. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | Нет class-toggle компонентов. |
| R1 | UNVERIFIED | Responsive-классы есть, но проверка брейкпоинтов не зафиксирована. |
| R2 | N/A | На странице нет бургер-меню/модалок/табов как функционала. |

#### 5.2.8) `3d_scan_advantages_&_contact_form_4/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | UI Kit страница: семантика частично, BEM отсутствует. Inline `<style>`/inline `<script>` присутствуют. |
| H2 | N/A | Форм нет. |
| H3 | PARTIAL | В примерах есть `href="#"`; кнопки без явного `type`. |
| C1 | MISSING | Нет CSS variables. |
| C2 | PARTIAL | Есть глобальные стили скроллбара (`::-webkit-scrollbar*`). |
| C3 | PARTIAL | `hover`/`focus` есть, `:disabled` нет. |
| C4 | MISSING | Есть таблица (technical specs), но она не обернута в `.table-wrapper`. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | Comparison slider/прочие компоненты не переключаются через классы. |
| R1 | UNVERIFIED | Responsive-классы есть, но проверки 320/768/1024/1440 нет. |
| R2 | N/A | Макет демонстрационный; функционального бургер-меню/модалок/табов нет. |

#### 5.2.9) `3d_scan_advantages_&_contact_form_5/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | UI Kit страница: BEM отсутствует, inline `<style>`/inline `<script>` присутствуют. |
| H2 | PARTIAL | В форме есть `label`/`placeholder`, `aria-*` отсутствуют; “upload” зона не является `<input type="file">`. |
| H3 | PARTIAL | У кнопок нет явного `type`; встречаются демонстрационные элементы без корректной семантики (upload). |
| C1 | MISSING | Нет CSS variables. |
| C2 | PARTIAL | Есть глобальные стили скроллбара (`::-webkit-scrollbar*`). |
| C3 | PARTIAL | `hover`/`focus` есть, `:disabled` нет. |
| C4 | MISSING | Блоки метрик/статистики не через `.stat-cards`/`.weekly-stats`. |
| J1 | MISSING | JS отсутствует (кроме tailwind.config). |
| J2 | MISSING | FAQ-аккордеон/переключения состояний не реализованы через class-toggle (сейчас статические состояния). |
| R1 | UNVERIFIED | Responsive-классы есть, но проверка брейкпоинтов не зафиксирована. |
| R2 | N/A | Макет демонстрационный; функционального бургер-меню/модалок/табов нет. |

#### 5.2.10) `детали_проекта_(кейс)/code.html`

| ID | Статус | Примечание |
|---|---:|---|
| H1 | PARTIAL | Семантика есть (`nav/section/footer`), BEM отсутствует. Inline `<style>`/inline `<script>` присутствуют, много inline `style=""` (фоновые изображения, фильтры). |
| H2 | N/A | Форм нет. |
| H3 | PARTIAL | Много `href="#"`; на mobile показана иконка меню, но это не кнопка и без `aria-label`; у кнопок нет явного `type`. |
| C1 | MISSING | Нет CSS variables. |
| C2 | PARTIAL | Есть глобальные стили скроллбара (`::-webkit-scrollbar*`). |
| C3 | PARTIAL | `hover` состояния есть, `:disabled` нет. |
| C4 | N/A | Таблиц/стат-блоков в требуемом формате нет. |
| J1 | MISSING | JS отсутствует (comparison slider статичен). |
| J2 | MISSING | Нет class-toggle логики. |
| R1 | UNVERIFIED | Responsive-классы есть, но проверки 320/768/1024/1440 нет. |
| R2 | MISSING | На mobile навигация скрыта, рабочее бургер-меню отсутствует; comparison slider не работает на touch (нет drag). |
