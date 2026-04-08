# React + TypeScript + Vite Template (JGest)

This is a custom React template optimized for rapid development, with Material UI, state management, and pre-configured API services.

## 🚀 Project Setup

### 1. Configure the API
For the project to communicate with your backend, you need to set the base URL in the `.env` file.

Create or edit the `.env` file at the root of the project:
```env
VITE_APP_API_URL='https://your-api.com/api'
```

### 2. Installation and Usage
```bash
npm install
npm run dev
```

---

## 🛠️ Services & Utilities

### `ApiService`
Location: `src/services/ApiService.ts`

An **Axios**-based service for making HTTP requests in a simple way. It already handles error catching and returns them in a consistent format.

**Usage:**
```typescript
import { api } from './services/ApiService';

// GET example
const data = await api.get<MyType>('/endpoint');

// POST example
const result = await api.post('/endpoint', { name: 'Example' });
```

### `useNotification` (Hook)
Location: `src/hooks/shared/useNotification.ts`

Allows displaying alerts (notifications) in the user interface. Must be used inside the `NotificationProvider`.

**Usage:**
```typescript
import { useNotification } from './hooks/shared/useNotification';

const { showNotification } = useNotification();

// Show a success message
showNotification('Operation successful', 'success');

// Automatically handle API errors
try {
    await api.post(...);
} catch (error) {
    showNotification(error); // Displays the error formatted by ApiService
}
```

### `useSetTimezone` (Hook)
Location: `src/hooks/shared/useSetTimezone.ts`

Utility for formatting dates received from the API to the local timezone (`Europe/Madrid`).

**Usage:**
```typescript
import useSetTimezone from './hooks/shared/useSetTimezone';

const { setTimezone } = useSetTimezone();
const formattedDate = setTimezone('2024-03-12T10:00:00Z');
// Output: "12/3/2024, 11:00:00" (adjusted to Madrid)
```

---

## 🧩 Featured Components

### `ThemeToggle`
Location: `src/components/main/ThemeSwitch.tsx`

A styled Switch component to toggle between light and dark mode. Uses a global store to persist the preference.

**Usage:**
Simply import and place the component in your navbar or sidebar:
```tsx
import ThemeToggle from './components/main/ThemeSwitch';

<ThemeToggle />
```

### `MyModal`
Location: `src/components/shared/MyModal.tsx`

A base component for creating consistent modals, with a blurred backdrop and internal scroll.

**Props:**
- `children`: Modal content.
- `minWidth`: Minimum width (default 800px).
- `onClose`: Function called when closing or clicking outside.

### `MyPopover`
Location: `src/components/shared/MyPopover.tsx`

Component for displaying context menus or flexible popovers with automatic positioning.

---

## 🏗️ Folder Structure
- `src/components`: Visual components (shared/main).
- `src/hooks`: Reusable logic and custom hooks.
- `src/providers`: Context providers (Notifications, Auth, etc.).
- `src/services`: API calls and external services.
- `src/store`: Global state management (Zustand/Context).
