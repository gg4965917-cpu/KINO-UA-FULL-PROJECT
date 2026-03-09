# 🚀 Швидкий Старт - КІНО.UA

**Ласкаво просимо!** Цей гайд допоможе вам швидко розпочати роботу з проектом.

---

## 📋 Що у вас є

✅ Повноцінний Next.js проект з TypeScript  
✅ Система управління станом (Zustand)  
✅ 15 українських фільмів з даними  
✅ Адаптивний дизайн для всіх пристроїв  
✅ Система бекапів  
✅ Готовність до деплою на Vercel/Docker/VPS  

---

## ⚡ Найшвидший спосіб запуску

```bash
# Перейдіть у папку проекту
cd kino-ua-project

# Запустіть автоматичний скрипт
./quick-start.sh
```

Скрипт автоматично:
1. Перевірить Node.js
2. Встановить залежності
3. Створить .env.local
4. Запитає чи запустити проект

---

## 🔧 Ручний запуск (якщо quick-start не спрацював)

### Крок 1: Встановлення залежностей

```bash
npm install
```

### Крок 2: Налаштування середовища

```bash
# Скопіюйте приклад .env
cp .env.example .env.local

# Відредагуйте .env.local (за бажанням)
# Додайте API ключі для TMDB, VideoCDN тощо
```

### Крок 3: Запуск

```bash
# Режим розробки
npm run dev

# Відкрийте http://localhost:3000
```

---

## 📁 Структура проекту

```
kino-ua-project/
├── app/                  # Next.js App Router
│   ├── page.tsx         # 🏠 Головна сторінка (основний файл)
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Глобальні стилі
│
├── components/          # React компоненти
│   ├── ToastNotifications.tsx  # Система сповіщень
│   └── Skeleton.tsx           # Loading states
│
├── lib/                 # Логіка та утиліти
│   ├── store.ts        # ⭐ Zustand state (favorites, filters)
│   └── movies.ts       # 🎬 Дані фільмів (15 фільмів)
│
├── public/             # Статичні файли
│
├── backups/            # Автоматичні бекапи
│
└── Scripts:
    ├── quick-start.sh   # 🚀 Швидкий старт
    ├── backup.sh        # 💾 Створити бекап
    └── restore.sh       # ↩️  Відновити з бекапу
```

---

## 🎨 Основні файли для редагування

### 1. **app/page.tsx** - Головна сторінка
Тут знаходиться весь UI компонент. Відкрийте цей файл для:
- Зміни дизайну
- Додавання нових секцій
- Налаштування анімацій

### 2. **lib/movies.ts** - База фільмів
```typescript
// Додайте новий фільм:
{
  id: 16,
  title: 'Новий фільм',
  titleEn: 'New Movie',
  description: 'Опис...',
  rating: 8.0,
  year: 2023,
  // ... інші поля
}
```

### 3. **lib/store.ts** - State Management
Тут зберігається:
- Favorites (обрані фільми)
- Filters (фільтри)
- Search query
- Watch history

---

## 🔄 Робочий процес

### Як додати новий фільм?

1. Відкрийте `lib/movies.ts`
2. Додайте об'єкт в масив `moviesData`:
```typescript
{
  id: 16, // наступний ID
  title: 'Назва фільму',
  titleEn: 'Movie Title',
  description: 'Опис фільму',
  rating: 8.0,
  year: 2023,
  duration: '120 хв',
  genre: ['Драма', 'Бойовик'],
  hasVoiceover: true,
  // ... решта полів
}
```
3. Збережіть файл
4. Перезавантажте сторінку

### Як змінити дизайн?

1. Відкрийте `app/page.tsx`
2. Знайдіть потрібний компонент
3. Змініть Tailwind класи
4. Зміни будуть видні миттєво (hot reload)

### Як змінити кольори?

1. Відкрийте `tailwind.config.js`
2. Змініть кольори в секції `theme.extend.colors`:
```javascript
colors: {
  'kino-yellow': {
    400: '#your-color',  // Змініть на свій
    500: '#your-color',
    600: '#your-color',
  }
}
```

---

## 💾 Система бекапів

### Створити бекап

```bash
./backup.sh
```

Це створить файл `backups/kino-ua-backup-{дата}.tar.gz`

### Відновити з бекапу

```bash
./restore.sh backups/kino-ua-backup-2026-03-09_22-39-43.tar.gz
```

**Порада:** Робіть бекап перед великими змінами!

---

## 🌐 Деплой на Vercel (5 хвилин)

### Варіант 1: Через GitHub (Рекомендовано)

```bash
# 1. Ініціалізуйте Git
git init
git add .
git commit -m "Initial commit"

# 2. Створіть репозиторій на GitHub
# Перейдіть на github.com → New Repository

# 3. Push код
git remote add origin https://github.com/your-username/kino-ua.git
git push -u origin main

# 4. Деплой на Vercel
# - Зайдіть на vercel.com
# - New Project
# - Імпортуйте ваш GitHub repo
# - Deploy!
```

### Варіант 2: Drag & Drop

1. Зберіть проект: `npm run build`
2. Зайдіть на [vercel.com](https://vercel.com)
3. Перетягніть папку проекту

**Детальніше:** Див. [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🐳 Деплой через Docker

```bash
# Збірка
docker build -t kino-ua .

# Запуск
docker run -p 3000:3000 kino-ua

# Або через docker-compose
docker-compose up -d
```

---

## 🛠️ Корисні команди

```bash
# Розробка
npm run dev          # Запустити в dev режимі
npm run build        # Зібрати для продакшн
npm run start        # Запустити продакшн build
npm run lint         # Перевірити код

# Бекапи
./backup.sh          # Створити бекап
./restore.sh <file>  # Відновити бекап

# Git
git status           # Подивитись зміни
git add .            # Додати всі зміни
git commit -m "msg"  # Зберегти зміни
git push             # Відправити на GitHub
```

---

## ❓ FAQ

### Q: Як додати свої API ключі?
A: Відредагуйте `.env.local` і додайте ключі TMDB, VideoCDN тощо.

### Q: Чому порт 3000 зайнятий?
A: Змініть порт у `package.json`:
```json
"dev": "next dev -p 3001"
```

### Q: Як очистити кеш?
A:
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### Q: Як оновити проект після внесення змін?
A:
```bash
# Локально - просто збережіть файл (hot reload)

# На Vercel - просто push в GitHub:
git add .
git commit -m "Оновлення"
git push
# Vercel автоматично задеплоїть!
```

### Q: Як працювати над проектом без перезакидування файлів?
A: Використовуйте Git + GitHub:
```bash
# Перший раз
git clone https://github.com/your-username/kino-ua.git
cd kino-ua
npm install
npm run dev

# Потім просто:
git pull  # Отримати останні зміни
# Працюйте...
git add .
git commit -m "Мої зміни"
git push  # Відправити зміни
```

---

## 🚨 Troubleshooting

### Проблема: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Проблема: "Port 3000 already in use"
```bash
# Знайдіть процес
lsof -i :3000

# Або використайте інший порт
npm run dev -- -p 3001
```

### Проблема: Сторінка не оновлюється
```bash
# Очистіть кеш Next.js
rm -rf .next
npm run dev
```

---

## 📚 Додаткові ресурси

- 📖 [README.md](./README.md) - Повна документація
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Детальний гайд по деплою
- 🎬 [lib/movies.ts](./lib/movies.ts) - Додавання фільмів
- 🎨 [tailwind.config.js](./tailwind.config.js) - Налаштування дизайну

---

## 💡 Підказки

✅ **Робіть бекапи** перед великими змінами  
✅ **Використовуйте Git** для версіонування  
✅ **Деплойте на Vercel** - це безкоштовно і просто  
✅ **Читайте коментарі** в коді - там багато підказок  
✅ **Експериментуйте** - Next.js має hot reload!  

---

## 🎉 Готово!

Тепер ви готові працювати з проектом КІНО.UA!

**Потрібна допомога?**
- Перевірте [DEPLOYMENT.md](./DEPLOYMENT.md)
- Перегляньте [README.md](./README.md)
- Створіть Issue на GitHub

**Приємної розробки! 🚀**

---

**КІНО.UA** - Створено з ❤️ для українського кіно
