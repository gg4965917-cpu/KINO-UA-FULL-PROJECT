# 🎬 КІНО.UA - Український Кіно-Портал

Сучасна платформа для перегляду українських фільмів з підтримкою української озвучки.

## 🚀 Технології

- **Next.js 14** (App Router) - React фреймворк з SSR/CSR
- **TypeScript** - Типізація коду
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **Lucide React** - Іконки
- **Framer Motion** - Анімації

## 📦 Встановлення

### 1. Клонування проекту

```bash
# Якщо у вас є Git репозиторій
git clone <your-repo-url>
cd kino-ua-project

# Або просто розпакуйте файли в папку
```

### 2. Встановлення залежностей

```bash
npm install
# або
yarn install
# або
pnpm install
```

### 3. Запуск в режимі розробки

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) в браузері.

## 🌐 Деплой на Vercel (Рекомендовано)

### Варіант 1: Через GitHub (Найпростіший)

1. **Створіть GitHub репозиторій:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Підключіть до Vercel:**
   - Зайдіть на [vercel.com](https://vercel.com)
   - Натисніть "New Project"
   - Імпортуйте ваш GitHub репозиторій
   - Vercel автоматично визначить Next.js і налаштує все
   - Натисніть "Deploy"
   - Готово! 🎉

### Варіант 2: Через Vercel CLI

```bash
# Встановіть Vercel CLI
npm i -g vercel

# Запустіть деплой
vercel

# Для продакшн деплою
vercel --prod
```

### Варіант 3: Drag & Drop на Vercel

1. Зберіть проект: `npm run build`
2. Зайдіть на [vercel.com](https://vercel.com)
3. Перетягніть папку `.next` на сайт
4. Готово!

## 🐳 Деплой через Docker

```bash
# Побудуйте образ
docker build -t kino-ua .

# Запустіть контейнер
docker run -p 3000:3000 kino-ua
```

## 📁 Структура проекту

```
kino-ua-project/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Головна сторінка
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Глобальні стилі
├── components/            # React компоненти
│   ├── Navbar.tsx        # Навігаційна панель
│   ├── HeroSlider.tsx    # Головний слайдер
│   ├── MovieGrid.tsx     # Сітка фільмів
│   ├── MovieCard.tsx     # Картка фільму
│   ├── MovieModal.tsx    # Модальне вікно
│   └── Filters.tsx       # Фільтри
├── lib/                   # Утиліти та API
│   ├── store.ts          # Zustand store
│   ├── api.ts            # API функції
│   └── movies.ts         # Дані фільмів
├── public/               # Статичні файли
│   ├── logo.svg
│   └── favicon.ico
├── package.json          # Залежності
├── next.config.js        # Next.js конфіг
├── tailwind.config.js    # Tailwind конфіг
└── tsconfig.json         # TypeScript конфіг
```

## 🎨 Функціонал

### ✅ Реалізовано

- [x] Адаптивний дизайн (mobile-first)
- [x] Hero Slider з автоматичною зміною
- [x] Live Search з автодоповненням
- [x] Фільтрація по жанрах
- [x] Фільтр "Українська озвучка"
- [x] Сортування (рейтинг, рік, назва)
- [x] Система обраного (Favorites)
- [x] Модальне вікно з деталями
- [x] Player Wrapper (готовий до інтеграції)
- [x] Smooth анімації та transitions
- [x] Dark theme
- [x] SEO оптимізація

### 🔜 Заплановано

- [ ] Інтеграція TMDB API
- [ ] Інтеграція VideoCDN / Ashdi API
- [ ] HLS.js player
- [ ] PostgreSQL (Supabase) для збереження даних
- [ ] Автентифікація користувачів
- [ ] Коментарі та рейтинги
- [ ] PWA підтримка
- [ ] Багатомовність (UA/EN)

## 🔧 Налаштування API (Майбутнє)

### TMDB API

1. Отримайте API ключ на [themoviedb.org](https://www.themoviedb.org/settings/api)
2. Створіть файл `.env.local`:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

### VideoCDN / Ashdi API

```env
NEXT_PUBLIC_VIDEO_API_KEY=your_video_api_key
NEXT_PUBLIC_VIDEO_API_URL=https://videocdn.tv/api
```

## 🛠 Доробка проекту

### Додавання нових фільмів

Відредагуйте `lib/movies.ts` і додайте нові об'єкти в масив.

### Додавання нових компонентів

```bash
# Створіть новий файл в components/
touch components/NewComponent.tsx
```

### Зміна стилів

Всі кольори та анімації налаштовані в `tailwind.config.js`.

## 📝 Скрипти

```bash
npm run dev      # Розробка (localhost:3000)
npm run build    # Збірка для продакшн
npm run start    # Запуск продакшн версії
npm run lint     # Перевірка коду
```

## 🐛 Виправлення багів

### Проблема з портами
```bash
# Змініть порт в package.json
"dev": "next dev -p 3001"
```

### Проблема з кешем
```bash
# Очистіть кеш
rm -rf .next
npm run dev
```

## 📞 Підтримка

Якщо виникли питання або знайшли баг:
1. Перевірте issues в репозиторії
2. Створіть новий issue з описом проблеми
3. Або напишіть на email: support@kino-ua.com

## 📄 Ліцензія

MIT License - вільне використання для будь-яких цілей.

---

**Створено з ❤️ для українського кіно**

🎬 Дивіться найкраще українське кіно на КІНО.UA
