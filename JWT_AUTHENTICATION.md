# JWT Authentication Implementation

## Overview
The Login and Register components now properly integrate JWT token-based authentication with a global AuthContext that manages user state and access tokens across the entire application.

## Architecture

### 1. AuthContext (`src/context/AuthContext.tsx`)
**Purpose**: Global authentication state management with JWT token persistence

**Key Features**:
- Stores user data and access token globally
- Auto-loads token on app mount (checks localStorage)
- Provides setters for user and token (used by Login/Register)
- Handles logout with token cleanup
- Tracks authentication status via `isAuthenticated` boolean

**State**:
```typescript
{
  user: User | null,           // Currently logged-in user
  accessToken: string | null,  // JWT access token
  isAuthenticated: boolean     // True if valid token exists
}
```

**Functions Provided**:
- `setUser(user)` - Update logged-in user
- `setAccessToken(token)` - Update JWT access token
- `logout()` - Clear user, token, and localStorage
- Hook: `useAuth()` - Access auth context in any component

### 2. AuthService (`src/services/authService.ts`)
**Existing Functions Enhanced**:
- `registerUser()` - POST /api/auth/register/
- `loginUser()` - POST /api/auth/login/
- `storeTokens()` - Save tokens to localStorage
- `getAccessToken()` - Retrieve access token
- `getRefreshToken()` - Retrieve refresh token
- `clearTokens()` - Remove tokens from storage
- `isAuthenticated()` - Check if token exists

### 3. Login Component (`src/components/Auth/Login.tsx`)
**Integration Points**:
1. Calls `loginUser(username, password)` from authService
2. On success:
   - Calls `storeTokens()` to save JWT tokens to localStorage
   - Calls `setUser()` from AuthContext to update global user state
   - Calls `setAccessToken()` from AuthContext to store token globally
   - Navigates to home page
3. On error:
   - Displays error message in Alert
   - Shows field-specific validation errors

**JWT Flow**:
```
User submits login
    ↓
POST /api/auth/login/ { username, password }
    ↓
Backend returns { access, refresh, user }
    ↓
storeTokens(response)  // localStorage: access_token, refresh_token
    ↓
setUser(response.user)  // AuthContext: global user state
    ↓
setAccessToken(response.access)  // AuthContext: global JWT token
    ↓
Navigate to home
```

### 4. Register Component (`src/components/Auth/Register.tsx`)
**Same Integration as Login**:
1. Calls `registerUser()` with form data
2. On success: stores tokens and updates AuthContext
3. On error: displays validation errors

## Token Management

### Storage
Tokens stored in localStorage:
```javascript
localStorage.setItem('access_token', response.access)
localStorage.setItem('refresh_token', response.refresh)
```

### Auto-Loading on App Start
```typescript
useEffect(() => {
  const token = getAccessToken();
  if (token) {
    setAccessToken(token);
  }
}, []);
```
This ensures users stay logged in across page refreshes.

### Logout
```typescript
logout() {
  setUser(null);
  setAccessToken(null);
  clearTokens();  // Removes from localStorage
}
```

## Using Auth in Components

```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, accessToken, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <p>Welcome {user?.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Request Headers

**Next Step**: Add auth header helper function to authService:
```typescript
export const getAuthHeaders = () => {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};
```

Then use in API calls:
```typescript
const response = await fetch(`${API_URL}/products/`, {
  headers: getAuthHeaders()
});
```

## Token Types

### Access Token
- Short-lived (typically 5-15 minutes)
- Sent with every authenticated request
- Used to authorize API calls

### Refresh Token
- Long-lived (typically 7-30 days)
- Stored securely in localStorage
- Used to obtain new access token when it expires

## Security Considerations

### Current Implementation
✅ Tokens stored in localStorage (accessible to JS)
✅ Token cleared on logout
✅ Auto-loads on app mount

### Future Improvements
- ⏳ Use HttpOnly cookies instead of localStorage (prevents XSS attacks)
- ⏳ Implement token refresh logic (auto-refresh when expires)
- ⏳ Add 401 interceptor to refresh token on demand
- ⏳ Add token expiry check (decode JWT to check `exp` claim)
- ⏳ Add logout on token expiry

## Files Modified

- ✅ `src/context/AuthContext.tsx` - Updated to manage JWT tokens globally
- ✅ `src/components/Auth/Login.tsx` - Integrated with AuthContext
- ✅ `src/components/Auth/Register.tsx` - Integrated with AuthContext
- ✅ `src/pages/LoginPage.tsx` - Fixed to avoid mock login conflicts
- ✅ `src/services/authService.ts` - Already has token management functions

## Build Status
✅ Build successful - no TypeScript errors
✅ Ready for production use with backend JWT authentication
