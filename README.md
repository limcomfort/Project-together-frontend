# Мессенджер «Очаг» - Frontend

React + TypeScript приложение мессенджера с человеческим теплом.

## Технологии

- React 19
- TypeScript
- Vite
- React Router
- Axios

## Структура проекта

```
src/
├── api/              # API клиент
│   └── client.ts     # Axios instance и методы API
├── components/       # Переиспользуемые компоненты
│   └── ui/          # UI компоненты (Avatar, Button, Input, Toggle, Badge, Card)
├── pages/           # Страницы приложения
│   ├── LoginPage.tsx
│   ├── ChatsPage.tsx
│   ├── ChatPage.tsx
│   ├── ProfilePage.tsx
│   ├── SearchPage.tsx
│   ├── VoiceCallPage.tsx
│   └── AttachmentsPage.tsx
├── types/           # TypeScript типы
│   └── index.ts     # Общие типы (User, Chat, Message, Poll и т.д.)
├── App.tsx          # Главный компонент с роутингом
├── main.tsx         # Точка входа
└── index.css        # Глобальные стили
```

## Дизайн-система

### Цвета
- Фон: `#0A0A0A`
- Карточки: `#1A1A1A`
- Акцент: `#E91E63` (розовый)
- Текст: `#FFFFFF`
- Вторичный текст: `#999999` / `#666666`
- Границы: `#2A2A2A`

### Компоненты UI
- **Avatar** - аватары с поддержкой статуса и обводки
- **Button** - кнопки (primary, secondary, outline, ghost)
- **Input** - текстовые поля с лейблами и ошибками
- **Toggle** - переключатели
- **Badge** - значки с вариантами (default, primary, success, warning, danger)
- **Card** - карточки контента

## Запуск

```bash
npm install
npm run dev
```

Приложение запустится на http://localhost:3000

## API

Backend должен быть запущен на `http://localhost:5000`

Переменные окружения в `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Роуты

- `/` - Вход (телефон + SMS код)
- `/chats` - Список диалогов
- `/chat/:id` - Чат/кооператив
- `/profile` - Профиль пользователя
- `/search` - Поиск
- `/call/:id` - Голосовой звонок
- `/attachments/:id` - Вложения и файлы

## Особенности реализации

- Pixel-perfect соответствие дизайну из макетов
- TypeScript для типизации всех данных
- Модульная архитектура с разделением компонентов
- API клиент с перехватчиками для авторизации
- Темная тема с фирменным розовым акцентом (#E91E63)
