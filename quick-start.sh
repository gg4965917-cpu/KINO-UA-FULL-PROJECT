#!/bin/bash

# Швидкий старт проекту КІНО.UA
# Автоматично встановить все необхідне та запустить проект

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════╗"
echo "║                                          ║"
echo "║        🎬 КІНО.UA - Швидкий Старт       ║"
echo "║                                          ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}"

# Функція для перевірки команди
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Перевірка Node.js
echo -e "${BLUE}🔍 Перевірка системи...${NC}"

if ! command_exists node; then
    echo -e "${YELLOW}❌ Node.js не встановлено${NC}"
    echo "Будь ласка, встановіть Node.js 18+ з https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${YELLOW}⚠️  Потрібна Node.js версія 18+${NC}"
    echo "Поточна версія: $(node -v)"
    echo "Оновіть Node.js з https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Перевірка npm
if ! command_exists npm; then
    echo -e "${YELLOW}❌ npm не встановлено${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm -v)${NC}"

# Встановлення залежностей
echo ""
echo -e "${BLUE}📦 Встановлення залежностей...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}❌ Помилка встановлення залежностей${NC}"
    exit 1
fi

# Створення .env.local якщо не існує
if [ ! -f ".env.local" ]; then
    echo ""
    echo -e "${BLUE}🔧 Створення .env.local...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✅ Створено .env.local${NC}"
    echo -e "${YELLOW}⚠️  Не забудьте додати ваші API ключі в .env.local${NC}"
fi

# Створення папки для бекапів
mkdir -p backups

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                          ║${NC}"
echo -e "${GREEN}║          ✨ Все готово! ✨              ║${NC}"
echo -e "${GREEN}║                                          ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"

echo ""
echo -e "${BLUE}🚀 Доступні команди:${NC}"
echo ""
echo "  npm run dev       - Запустити в режимі розробки"
echo "  npm run build     - Зібрати для продакшн"
echo "  npm run start     - Запустити продакшн версію"
echo "  ./backup.sh       - Створити бекап проекту"
echo ""

echo -e "${YELLOW}❓ Хочете запустити проект зараз? (yes/no)${NC}"
read -r start_now

if [ "$start_now" = "yes" ]; then
    echo ""
    echo -e "${GREEN}🚀 Запускаємо проект...${NC}"
    echo -e "${BLUE}📍 Відкрийте http://localhost:3000 в браузері${NC}"
    echo ""
    npm run dev
else
    echo ""
    echo -e "${GREEN}👍 Чудово! Коли будете готові, запустіть: ${YELLOW}npm run dev${NC}"
    echo ""
fi
