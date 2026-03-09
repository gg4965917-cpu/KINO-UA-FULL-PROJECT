# 🚀 Гайд по деплою КІНО.UA

Цей документ містить покрокові інструкції для розгортання проекту на різних платформах.

## 📋 Зміст

1. [Vercel (Рекомендовано)](#vercel)
2. [Docker](#docker)
3. [VPS / Dedicated Server](#vps)
4. [AWS / GCP / Azure](#cloud)
5. [Netlify](#netlify)

---

## 🎯 Vercel (Найпростіший спосіб)

### Переваги:
- ✅ Безкоштовний для hobby проектів
- ✅ Автоматичний CI/CD
- ✅ Global CDN
- ✅ Instant rollbacks
- ✅ Preview deployments для кожного PR

### Крок 1: Підготовка GitHub репозиторію

```bash
# У папці проекту
git init
git add .
git commit -m "Initial commit: КІНО.UA project"

# Створіть репозиторій на GitHub і підключіть його
git remote add origin https://github.com/your-username/kino-ua.git
git branch -M main
git push -u origin main
```

### Крок 2: Деплой на Vercel

#### Варіант A: Через веб-інтерфейс (найлегше)

1. Зайдіть на [vercel.com](https://vercel.com)
2. Натисніть **"New Project"**
3. Імпортуйте ваш GitHub репозиторій
4. Vercel автоматично визначить Next.js
5. Налаштуйте Environment Variables (якщо потрібно):
   - `NEXT_PUBLIC_TMDB_API_KEY`
   - `NEXT_PUBLIC_VIDEO_API_KEY`
   - Інші з `.env.example`
6. Натисніть **"Deploy"**
7. Готово! 🎉

#### Варіант B: Через Vercel CLI

```bash
# Встановіть Vercel CLI
npm i -g vercel

# Залогіньтесь
vercel login

# Деплой
vercel

# Для продакшн
vercel --prod
```

### Крок 3: Налаштування домену (опціонально)

1. У Vercel dashboard: **Settings → Domains**
2. Додайте ваш домен (наприклад, `kino-ua.com`)
3. Налаштуйте DNS записи у вашого реєстратора:
   ```
   A    @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
4. Дочекайтеся propagation (~5-30 хвилин)

### Оновлення проекту

```bash
# Просто push в GitHub
git add .
git commit -m "Update feature"
git push

# Vercel автоматично задеплоїть зміни!
```

---

## 🐳 Docker Deployment

### Переваги:
- ✅ Працює скрізь
- ✅ Ізольоване середовище
- ✅ Легко масштабується

### Крок 1: Збірка образу

```bash
# У папці проекту
docker build -t kino-ua:latest .
```

### Крок 2: Запуск контейнера

```bash
# Простий запуск
docker run -p 3000:3000 kino-ua:latest

# З environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_TMDB_API_KEY=your_key \
  -e NODE_ENV=production \
  kino-ua:latest

# У фоновому режимі
docker run -d -p 3000:3000 --name kino-ua-app kino-ua:latest
```

### Крок 3: Docker Compose (рекомендовано)

```bash
# Запуск
docker-compose up -d

# Перегляд логів
docker-compose logs -f

# Зупинка
docker-compose down

# Перебудова після змін
docker-compose up -d --build
```

### Push в Docker Hub (опціонально)

```bash
# Логін
docker login

# Tag
docker tag kino-ua:latest your-username/kino-ua:latest

# Push
docker push your-username/kino-ua:latest
```

---

## 💻 VPS / Dedicated Server

### Підходить для: Ubuntu 20.04+, Debian 11+, CentOS 8+

### Крок 1: Підготовка сервера

```bash
# Оновлення системи
sudo apt update && sudo apt upgrade -y

# Встановлення Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Встановлення PM2 (process manager)
sudo npm install -g pm2

# Встановлення Nginx (опціонально, для reverse proxy)
sudo apt install -y nginx
```

### Крок 2: Завантаження проекту

```bash
# Клонування з GitHub
cd /var/www
sudo git clone https://github.com/your-username/kino-ua.git
cd kino-ua

# Встановлення залежностей
sudo npm install

# Build проекту
sudo npm run build
```

### Крок 3: Запуск з PM2

```bash
# Запуск
pm2 start npm --name "kino-ua" -- start

# Автозапуск при перезавантаженні
pm2 startup
pm2 save

# Моніторинг
pm2 monit

# Логи
pm2 logs kino-ua
```

### Крок 4: Nginx reverse proxy

```bash
# Створіть конфігурацію
sudo nano /etc/nginx/sites-available/kino-ua

# Додайте:
server {
    listen 80;
    server_name kino-ua.com www.kino-ua.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Активуйте конфіг
sudo ln -s /etc/nginx/sites-available/kino-ua /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Крок 5: SSL сертифікат (Let's Encrypt)

```bash
# Встановлення Certbot
sudo apt install -y certbot python3-certbot-nginx

# Отримання сертифіката
sudo certbot --nginx -d kino-ua.com -d www.kino-ua.com

# Автооновлення (вже налаштовано автоматично)
sudo certbot renew --dry-run
```

---

## ☁️ Cloud Platforms (AWS, GCP, Azure)

### AWS Amplify

```bash
# Встановіть AWS Amplify CLI
npm install -g @aws-amplify/cli

# Ініціалізація
amplify init

# Додайте hosting
amplify add hosting

# Deploy
amplify publish
```

### Google Cloud Platform (Cloud Run)

```bash
# Встановіть gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Авторизація
gcloud auth login

# Build і push образу
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/kino-ua

# Deploy
gcloud run deploy kino-ua \
  --image gcr.io/YOUR_PROJECT_ID/kino-ua \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

---

## 🌐 Netlify

### Крок 1: netlify.toml

Створіть файл `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Крок 2: Deploy

```bash
# Встановіть Netlify CLI
npm install -g netlify-cli

# Авторизація
netlify login

# Deploy
netlify deploy --prod
```

---

## 🔄 Оновлення проекту на сервері

### Vercel
```bash
git push  # Автоматично оновлюється
```

### Docker
```bash
docker-compose down
docker-compose build
docker-compose up -d
```

### VPS
```bash
cd /var/www/kino-ua
git pull
npm install
npm run build
pm2 restart kino-ua
```

---

## 🛠️ Troubleshooting

### Помилка "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Помилка при build
```bash
rm -rf .next
npm run build
```

### Проблеми з портами
```bash
# Перевірте, що порт 3000 вільний
lsof -i :3000
# Або змініть порт у package.json
```

### Memory issues
```bash
# Збільшіть Node.js memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

---

## 📞 Підтримка

Якщо виникли проблеми:
1. Перевірте [Issues на GitHub](https://github.com/your-username/kino-ua/issues)
2. Створіть новий Issue з детальним описом
3. Приєднуйтесь до нашого [Discord](https://discord.gg/kino-ua)

---

**Створено з ❤️ для українського кіно**

🎬 КІНО.UA
