#!/bin/bash

# Скрипт для відновлення проекту з бекапу
# Використання: ./restore.sh [backup-file.tar.gz]

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🎬 КІНО.UA - Відновлення з бекапу${NC}"
echo "======================================"

# Перевірка аргументів
if [ -z "$1" ]; then
    echo -e "${YELLOW}📋 Доступні бекапи:${NC}"
    ls -lht backups/*.tar.gz 2>/dev/null || echo "Немає доступних бекапів"
    echo ""
    echo "Використання: ./restore.sh <файл-бекапу>"
    echo "Приклад: ./restore.sh backups/kino-ua-backup-2026-03-09_22-39-43.tar.gz"
    exit 1
fi

BACKUP_FILE=$1

# Перевірка існування файлу
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Помилка: Файл $BACKUP_FILE не знайдено${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  УВАГА: Це видалить поточні файли проекту!${NC}"
echo -e "${YELLOW}Ви впевнені? (yes/no)${NC}"
read -r confirmation

if [ "$confirmation" != "yes" ]; then
    echo -e "${BLUE}Скасовано${NC}"
    exit 0
fi

echo -e "${BLUE}📦 Відновлення з $BACKUP_FILE...${NC}"

# Створюємо тимчасову папку
TEMP_DIR=$(mktemp -d)

# Розпаковуємо бекап у тимчасову папку
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

# Видаляємо поточні файли (крім node_modules і .git)
echo -e "${BLUE}🗑️  Очищення поточних файлів...${NC}"
find . -maxdepth 1 -not -name 'node_modules' -not -name '.git' -not -name 'backups' -not -name '.' -not -name '..' -exec rm -rf {} +

# Копіюємо файли з бекапу
echo -e "${BLUE}📋 Копіювання файлів з бекапу...${NC}"
cp -r "$TEMP_DIR"/* .
cp -r "$TEMP_DIR"/.[!.]* . 2>/dev/null

# Очищаємо тимчасову папку
rm -rf "$TEMP_DIR"

# Встановлюємо залежності
echo -e "${BLUE}📥 Встановлення залежностей...${NC}"
npm install

echo -e "${GREEN}✅ Відновлення завершено успішно!${NC}"
echo ""
echo -e "${BLUE}Наступні кроки:${NC}"
echo "1. Перевірте налаштування в .env.local"
echo "2. Запустіть проект: npm run dev"
echo ""
echo -e "${GREEN}✨ Готово!${NC}"
