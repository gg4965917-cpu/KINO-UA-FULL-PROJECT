#!/bin/bash

# Скрипт для створення бекапів проекту КІНО.UA
# Використання: ./backup.sh

# Кольори для виводу
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎬 КІНО.UA - Система бекапів${NC}"
echo "=================================="

# Створюємо папку для бекапів
BACKUP_DIR="backups"
mkdir -p $BACKUP_DIR

# Генеруємо ім'я файлу з датою
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_NAME="kino-ua-backup-$TIMESTAMP"
BACKUP_FILE="$BACKUP_DIR/$BACKUP_NAME.tar.gz"

echo -e "${BLUE}📦 Створюємо бекап...${NC}"

# Створюємо архів (виключаємо node_modules, .next, і сам бекап)
tar -czf $BACKUP_FILE \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='backups' \
  --exclude='.git' \
  --exclude='*.log' \
  .

# Перевіряємо розмір
SIZE=$(du -h $BACKUP_FILE | cut -f1)

echo -e "${GREEN}✅ Бекап створено успішно!${NC}"
echo "📁 Файл: $BACKUP_FILE"
echo "💾 Розмір: $SIZE"
echo ""

# Показуємо останні 5 бекапів
echo -e "${BLUE}📋 Останні бекапи:${NC}"
ls -lht $BACKUP_DIR | head -6

echo ""
echo -e "${GREEN}✨ Готово!${NC}"

# Опціонально: видаляємо старі бекапи (більше 7 днів)
find $BACKUP_DIR -name "kino-ua-backup-*.tar.gz" -type f -mtime +7 -delete
echo "🗑️  Старі бекапи (>7 днів) видалено"
