# UI Компоненты мессенджера «Очаг»

## Avatar

Компонент аватара с поддержкой различных размеров, обводки и запасного текста.

### Props

```typescript
interface AvatarProps {
  src?: string;           // URL изображения
  name: string;           // Имя пользователя (для alt и fallback)
  size?: 'small' | 'medium' | 'large' | 'xlarge';  // Размер: 40px, 56px, 80px, 120px
  border?: boolean;       // Показать обводку
  borderColor?: string;   // Цвет обводки (по умолчанию #E91E63)
  style?: CSSProperties;  // Дополнительные стили
}
```

### Примеры использования

```tsx
// Базовый аватар
<Avatar src="https://example.com/avatar.jpg" name="Аня" />

// С обводкой
<Avatar 
  src="https://example.com/avatar.jpg" 
  name="Лука" 
  size="xlarge"
  border
  borderColor="#FFC107"
/>

// Без изображения (показывает первую букву имени)
<Avatar name="Гриша" size="medium" />
```

---

## Button

Универсальная кнопка с различными вариантами оформления.

### Props

```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;    // Растянуть на всю ширину
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}
```

### Примеры использования

```tsx
// Primary кнопка
<Button variant="primary" size="large" fullWidth>
  Войти в круг общения
</Button>

// Outline кнопка
<Button variant="outline" onClick={handleLogout}>
  Выйти из Очага
</Button>

// Secondary маленькая
<Button variant="secondary" size="small">
  Отмена
</Button>

// Ghost кнопка с кастомными стилями
<Button variant="ghost" style={{ color: '#4CAF50' }}>
  Сохранить
</Button>
```

---

## Input

Текстовое поле с лейблом, поддержкой ошибок и различными типами.

### Props

```typescript
interface InputProps {
  label?: string;         // Текст над полем
  type?: string;          // text, tel, email, password и т.д.
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;         // Текст ошибки
  disabled?: boolean;
  fullWidth?: boolean;
  maxLength?: number;
  style?: CSSProperties;
}
```

### Примеры использования

```tsx
// Поле телефона
<Input
  label="НОМЕР ТЕЛЕФОНА"
  type="tel"
  placeholder="+7 (999) 123-45-67"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  fullWidth
/>

// С ошибкой
<Input
  label="КОД ИЗ СМС"
  type="text"
  placeholder="4 8 2 1"
  value={code}
  onChange={(e) => setCode(e.target.value)}
  error="Неверный код. Попробуйте еще раз"
  maxLength={4}
/>

// Email
<Input
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## Toggle

Переключатель on/off с анимацией.

### Props

```typescript
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}
```

### Примеры использования

```tsx
// Базовый переключатель
<Toggle
  checked={notifications}
  onChange={setNotifications}
/>

// Disabled состояние
<Toggle
  checked={darkMode}
  onChange={setDarkMode}
  disabled={!isPremium}
/>

// В строке настроек
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Мягкие уведомления</span>
  <Toggle checked={notifications} onChange={setNotifications} />
</div>
```

---

## Badge

Значки с различными цветовыми вариантами для статусов и меток.

### Props

```typescript
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium';
}
```

### Примеры использования

```tsx
// Счетчик непрочитанных
<Badge variant="primary" size="small">2</Badge>

// Статус организатора
<Badge variant="warning">Организатор</Badge>

// Активность
<Badge variant="success">Онлайн</Badge>

// Предупреждение
<Badge variant="danger">Заблокирован</Badge>

// По умолчанию
<Badge>Метка</Badge>
```

---

## Card

Универсальная карточка для группировки контента.

### Props

```typescript
interface CardProps {
  children: ReactNode;
  onClick?: () => void;    // Делает карточку кликабельной
  selected?: boolean;      // Показывает выделение
  style?: CSSProperties;
}
```

### Примеры использования

```tsx
// Базовая карточка
<Card>
  <p>Содержимое карточки</p>
</Card>

// Кликабельная с выделением
<Card onClick={() => selectChat(chat.id)} selected={selectedId === chat.id}>
  <ChatPreview chat={chat} />
</Card>

// С кастомными стилями
<Card style={{ padding: '24px', marginBottom: '16px' }}>
  <h3>Заголовок</h3>
  <p>Описание</p>
</Card>
```

---

## Композиция компонентов

### Пример: Элемент списка чатов

```tsx
<Card onClick={() => navigate(`/chat/${chat.id}`)}>
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Avatar src={chat.avatar} name={chat.name} size="medium" />
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span>{chat.name}</span>
        {chat.isOrganizer && <Badge variant="warning">Организатор</Badge>}
      </div>
      <p>{chat.lastMessage}</p>
    </div>
    {chat.unreadCount > 0 && (
      <Badge variant="primary" size="small">{chat.unreadCount}</Badge>
    )}
  </div>
</Card>
```

### Пример: Форма входа

```tsx
<form onSubmit={handleSubmit}>
  <Input
    label="НОМЕР ТЕЛЕФОНА"
    type="tel"
    placeholder="+7 (999) 123-45-67"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    error={errors.phone}
    fullWidth
  />
  <Button 
    type="submit" 
    variant="primary" 
    fullWidth 
    size="large"
    disabled={loading}
  >
    {loading ? 'Отправка...' : 'Получить код'}
  </Button>
</form>
```

### Пример: Настройка профиля

```tsx
<Card>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', gap: '12px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '8px',
        backgroundColor: '#E91E63',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        🔔
      </div>
      <div>
        <div>Мягкие уведомления</div>
        <div style={{ fontSize: '13px', color: '#666' }}>
          Получать звуковые уведомления
        </div>
      </div>
    </div>
    <Toggle checked={notifications} onChange={setNotifications} />
  </div>
</Card>
```

---

## Цветовая палитра компонентов

### Варианты Badge
- **default**: `#2A2A2A` (серый)
- **primary**: `rgba(233, 30, 99, 0.15)` + border (розовый)
- **success**: `rgba(76, 175, 80, 0.15)` + border (зеленый)
- **warning**: `rgba(255, 193, 7, 0.15)` + border (желтый)
- **danger**: `rgba(244, 67, 54, 0.15)` + border (красный)

### Варианты Button
- **primary**: `#E91E63` (розовый)
- **secondary**: `#3A3A3A` (темно-серый)
- **outline**: прозрачный с border `#2A2A2A`
- **ghost**: полностью прозрачный

### Состояния компонентов
- **hover**: opacity: 0.9
- **focus**: outline: 2px solid #E91E63
- **disabled**: opacity: 0.5, cursor: not-allowed
- **active**: scale(0.98)

---

## Адаптивность

Все компоненты спроектированы для мобильных устройств:
- Минимальная высота touch-элементов: 44px
- Отступы для комфортного взаимодействия: 12-20px
- Шрифты масштабируются для экранов <768px

## Accessibility

- Все интерактивные элементы доступны с клавиатуры
- Семантические HTML теги
- ARIA-атрибуты где необходимо
- Focus-стили для навигации
- Alt-тексты для изображений

