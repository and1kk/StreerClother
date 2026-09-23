web application/stitch/projects/8049130832750295867/screens/81042d4b5f384cf1acb728bd05cb9e7d
# VOID™ Streetwear — Design System & Implementation Guidelines

Этот документ описывает полную спецификацию дизайна, дизайн-токены, типографику, архитектуру компонентов и паттерны интерфейса для автономной и консистентной разработки любых страниц экосистемы бренда **VOID™** (каталоги, карточки товара PDP, корзина, чекаут, личный кабинет, лукбуки, архивы и др.).

---

## 1. Бренд и концептуальная эстетика
- **Название:** VOID™ / VOID INDUSTRIES™
- **Эстетика:** Brutalist Technical Subcultural Streetwear / Cyber-Military / Utilitarian Monochrome.
- **Ключевые принципы:**
  1. **Strict Geometry (Строгая геометрия):** Абсолютно острые углы (`rounded-none` / `border-radius: 0px`). Никаких скруглений (`rounded-md`, `rounded-full` запрещены, за исключением индикаторов статуса 2–4px при необходимости).
  2. **Monochrome Dominance (Монохромная палитра):** Глубокий угольно-чёрный фон, чистый белый контраст для ключевых элементов, градации графитового серого для вспомогательных данных.
  3. **Technical Specs & Metadata (Техническая спецификация):** Инженерный стиль надписей, использование двойных слешей (`//`), серийных номеров, артикулов (`SKU: 091-HD`), плотностей ткани (`450 GSM`), координат, статусов (`STATUS: OPERATIONAL`, `SPEC-VERIFIED`).
  4. **High Information Density & Contrast (Плотность и контрастность):** Тонкие линии толщиной 1px (`border-neutral-800` или `border-white`), чётко разграничивающие сетку.

---

## 2. Цветовая палитра (Color Palette)

| Роль | HEX | Tailwind класс / CSS Var | Применение |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#0e0e0e` / `#131313` | `bg-[#0e0e0e]`, `bg-[#131313]` | Основной фон всей страницы, подложка |
| **Surface Low** | `#1b1b1b` | `bg-[#1b1b1b]` | Фон карточек, боковых панелей, полей ввода |
| **Surface Bright / Hover** | `#262626` / `#333333` | `bg-[#262626]`, `hover:bg-[#333333]` | Ховер-состояния кнопок и карточек |
| **Primary Accent / Text** | `#ffffff` | `text-white`, `bg-white` | Основные заголовки, активные кнопки CTA |
| **Primary Inverse Text** | `#000000` | `text-black` | Текст внутри белых кнопок («ADD TO BAG», «JOIN») |
| **Secondary / Muted Text**| `#8c8c8c` / `#a3a3a3` | `text-neutral-400`, `text-neutral-500` | Метаданные, подзаголовки, артикулы, хлебные крошки |
| **Border / Grid Lines** | `#262626` / `#333333` | `border-neutral-800`, `border-[#262626]` | Разделители колонок, контуры карточек, фильтров |
| **Contrast Border** | `#ffffff` | `border-white` | Выбранные размеры, активный ракурс в галерее |
| **Status / Alert (Warning)** | `#e11d48` / `#ef4444` | `text-red-500`, `bg-red-500/10` | Бейджи скидок (`SALE -25%`), индикатор малого остатка |

---

## 3. Типографика (Typography System)

### Шрифты:
- **Display / Headers:** `Anton`, `Impact`, `Syne` или тяжелый брутальный гротеск без засечек с плотным кернингом (`uppercase tracking-wider` / `tracking-tight`).
- **Body & Specs / Data:** Моноширинный или ультра-чистый технический гротеск: `JetBrains Mono`, `Space Mono`, `Chivo Mono` или `Inter` / `Roboto Mono`.

### Иерархия текста:
- **Brand Logo:** `font-display text-2xl tracking-tighter uppercase font-black` (`VOID™`).
- **H1 (Product / Page Title):** `text-3xl lg:text-4xl uppercase font-black tracking-tight leading-none`.
- **H2 / Section Title:** `text-xl lg:text-2xl uppercase font-bold tracking-tight` (например, `COMPLETE THE UNIFORM // COMPATIBLE SPEC`).
- **Technical Badges / Metadata:** `font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400` (`FRAME 01 // 04`, `SKU // 091-HD`, `SPEC VERIFICATION: ACTIVE`).
- **Body / Description:** `font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal`.
- **Price / Figures:** `font-mono font-bold text-lg sm:text-xl text-white`.

---

## 4. Глобальные компоненты интерфейса (Global UI Chrome)

### 4.1. Top Navigation Bar & Announcement Strip
- **Верхний тикер (Top Ribbon):**
  - Чёрная плашка `bg-[#0e0e0e] border-b border-neutral-900 py-1.5 text-center font-mono text-[10px] tracking-widest text-neutral-400 uppercase`.
  - Текст: `FREE STANDARD SHIPPING ON ORDERS OVER 2000 UAH` или системное объявление.
- **Главный хедер:**
  - `h-16 px-6 sm:px-12 flex items-center justify-between border-b border-neutral-800 bg-[#131313]`.
  - **Слева:** Навигационные ссылки (`SHOP`, `COLLECTIONS`, `ARCHIVE`) в `uppercase tracking-widest text-xs font-mono font-medium hover:text-white text-neutral-300`.
  - **По центру:** Логотип `VOID™` с фирменным знаком.
  - **Справа:** Иконки утилитарного поиска (`search`), счетчика корзины с цифровым бейджем (`[ 3 ]` или иконка шопера) и аккаунта (`person`).

### 4.2. Footer (Архитектурный подвал)
- Сетка на 4 колонки (`grid grid-cols-1 md:grid-cols-4 gap-8 py-16 px-6 sm:px-12 border-t border-neutral-800 bg-[#0e0e0e]`):
  1. **Brand Spec:** Логотип `VOID™`, микро-манифест: `Architectural brutalist subcultural fashion. High-spec technical apparel engineered with zero compromise.`
  2. **Index:** Ссылки каталога (`SHOP ALL`, `LOOKBOOK FW25`, `TECHNICAL ARCHIVE`, `DISPATCH & TRACKING`).
  3. **Communication:** Координаты (`TERMINAL KYIV / BASE 01`, `DISPATCH: ORDERS OVER 2000 UAH COMPLIMENTARY`, `STATUS: OPERATIONAL`).
  4. **System Dispatch (Newsletter):** Поле ввода `ENTER FREQUENCY...` с кнопкой `JOIN` (`bg-white text-black font-mono font-bold text-xs uppercase px-4`).

---

## 5. Паттерны страниц

### 5.1. Страница Каталога (Catalog / PLP)
- **Сайдбар фильтрации (`INDEX FILTER`):**
  - Левая колонка шириной ~280px с фиксированной структурой секций (аккордеоны с нумерацией `01 // CATEGORY`, `02 // SIZE SPEC`, `03 // PALETTE`, `04 // SILHOUETTE FIT`, `05 // VALUATION`).
  - Чекбоксы и радио-кнопки кастомные: строгие квадраты с белой заливкой при активации.
  - Плашка активных тегов (`Applied Specs`) с кнопками быстрого сброса `CAT: HOODIES ×`.
- **Сетка товаров:**
  - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-neutral-800`.
  - Каждая карточка имеет правую и нижнюю рамку `border-r border-b border-neutral-800`.
- **Карточка товара:**
  - Бейджи в верхних углах (`NEW`, `SALE -25%`, `LIMITED`) в строгих прямоугольных рамках `font-mono text-[9px] uppercase px-1.5 py-0.5`.
  - Фотография модели на текстурном/городском бруталистском фоне (высота `aspect-[3/4]` или `aspect-[4/5]`).
  - Название товара капсом, цена (`$180 USD`), артикул (`SKU // 091-HD`) и название цвета (`WASHED BLACK`).

### 5.2. Страница Товара (Product Details Page / PDP)
- **Галерея изображений:**
  - **Вертикальный столбец миниатюр слева:**
    - Ширина ~`w-16` / `w-20`, плотный стек (`gap-1` или `gap-2`).
    - Кнопки прокрутки сверху (▲) и снизу (▼) с контрастной белой рамкой `border border-white text-white hover:bg-white hover:text-black`.
    - Угловые метки ракурса (`01`, `02`, `03`, `04`).
    - Активная миниатюра выделена контрастной белой рамкой `border-2 border-white`.
  - **Основной вьюпорт изображения:**
    - Большой видовой экран без лишних накладных стрелок поверх фото.
    - Поддержка горизонтального свайпа (как для тач-устройств, так и для мыши через drag/touch-события).
    - Верхний технический хедер: `[•] OPTICAL RECORD // 04 ANGLES` и `FRAME 01 / 04  [↔ SWIPE / ARROWS]`.
- **Панель конфигурации и покупки (Справа):**
  - Бейджи: `NEW DISPATCH // ARCHIVE FW25` | `HEAVY-SPEC`.
  - Заголовок H1 и цена с индикатором остатка (`LOW INVENTORY // 3 UNITS REMAINING` с красным маячком).
  - Селектор цвета (`COLORWAY: WASHED BLACK` с кодом `CODE: 01-WB`).
  - Сетка выбора размера: табличные ячейки `S`, `M`, `L`, `XL`, `XXL` в рамке `border-neutral-700`, активный размер инвертирован (`bg-white text-black font-bold`).
  - Кнопка **CTA («ADD TO BAG»)**: `w-full h-14 bg-white text-black font-mono font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors`.
  - Вспомогательные действия: кнопки `SAVE TO ARCHIVE` и `SHARE SPEC`.
  - Технические аккордеоны с нумерацией:
    - `01 // SYSTEM SPECIFICATION & DESCRIPTION`
    - `02 // FIT & FABRIC MATRIX`
    - `03 // DISPATCH, LOGISTICS & RETURNS`
    - `04 // CARE INSTRUCTIONS & MAINTENANCE`
  - Плашка верификации: `VOID™ CRYPTOGRAPHIC NFC AUTHENTICATION EMBEDDED [SEC-VERIFIED]`.
- **Секция «COMPLETE THE UNIFORM»:**
  - 4-колоночный модуль совместимых элементов гардероба с кнопками `+ QUICK ADD`.

---

## 6. Микроинтерактивность и состояния (Interactions & States)
1. **Hover-эффекты:**
   - Белые кнопки инвертируются или переходят в светло-серый (`hover:bg-neutral-200`).
   - Чёрные контурные кнопки заливаются белым с черным текстом (`hover:bg-white hover:text-black`).
   - Изображения при наведении могут иметь легкий масштаб (`group-hover:scale-105 transition-transform duration-500 ease-out`) или эффект обесцвечивания/проявления.
2. **Фокус и клавиатурная навигация:**
   - `focus:outline-none focus:ring-1 focus:ring-white`.
3. **Плавность:**
   - Резкие или мгновенные переключения с минимальным `transition-colors duration-150` без «мягких» мультяшных пружинных анимаций.

---

## 7. Чек-лист для генерации новых страниц AI
При создании любой новой страницы (например, Cart, Checkout, Lookbook, Account):
- [ ] Острые углы везде (`rounded-none`).
- [ ] Преобладающий тёмный фон (`#0e0e0e` / `#131313`) с белым текстом и серыми тонкими границами (`border-neutral-800`).
- [ ] Технический моноширинный язык разметки: нумерация секций `01 //`, `SKU //`, системные плашки капсом.
- [ ] Главная кнопка действия (CTA) — белая с черным моноширинным жирным текстом.
- [ ] Поддержка мобильной адаптивности: на мобильных экранах сетка сжимается в 1-2 колонки, горизонтальные свайпы сохраняются.
- [ ] Единые глобальный хедер и футер бренда VOID™.
