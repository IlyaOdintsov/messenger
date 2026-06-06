# Messenger 💬

Мессенджер с реальным временем обмена сообщениями, созданный с использованием современного стека технологий.

## 📋 О проекте

Messenger — это веб-приложение для обмена сообщениями в реальном времени. Проект включает в себя клиентскую часть на React, серверную часть на Node.js и Redis для управления сессиями и кэширования.

### 🛠 Технологии

**Frontend:**
- React 19
- TypeScript
- Redux Toolkit
- Socket.io-client
- SCSS Modules
- Vite

**Backend:**
- Node.js
- Express
- Socket.io
- Redis
- JWT авторизация

## 📋 Требования

- Node.js (версия 18 или выше)
- npm или yarn
- Docker Desktop (для Redis)



## 🚀 Локальный запуск

### Часть 1: 1. Клонирование репозитория

```bash
git clone https://github.com/IlyaOdintsov/messenger
cd messenger
```



## Часть 2: 🐳 Настройка Redis

### 2. Настройка Redis через Docker

- Проект использует Redis для хранения сессий и кэширования. Проще всего запустить его через Docker.

#### Установка Docker Desktop

- Скачайте и установите [Docker Desktop](https://www.docker.com/products/docker-desktop/) для вашей операционной системы.

#### Запуск Redis через Docker CLI (рекомендуется)

```bash
docker run -d --name messenger-redis -p 6379:6379 redis:latest
```



## Часть 3: Запуск backend и frontend


### 3. Запуск backend части

- Откройте **новый терминал** и выполните:

```bash
cd server
npm install
npm run dev
```

Backend сервер запустится на порту http://localhost:5000


### 4. Запуск frontend части

Откройте **еще один новый терминал** и выполните:

```bash
cd client
npm install
npm run dev
```
Frontend будет доступен по адресу: http://localhost:5173


📝 Важные примечания

Порядок запуска 

- Сначала запустите Redis через Docker

- Затем backend часть

- После frontend часть
