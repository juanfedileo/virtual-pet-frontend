# Backend Integration - User Registration with JWT Authentication

## Overview
The frontend is now integrated with the Django backend for user registration and JWT token-based authentication.

## Components Implemented

### 1. Environment Configuration (`/.env` and `/.env.production`)
**Purpose**: Manage API endpoints across development and production environments using Vite's environment variables.

**Development (.env)**:
```
VITE_API_URL=http://127.0.0.1:8000/api
VITE_ENV=development
```

**Production (.env.production)**:
```
VITE_API_URL=https://api.virtualpet.com/api
VITE_ENV=production
```

**Usage**: 
- Automatically selected by Vite based on build mode
- Accessed in code via `import.meta.env.VITE_API_URL`

### 2. Auth Service (`/src/services/authService.ts`)
**Purpose**: Centralized service for all authentication API calls and token management.

**Key Functions**:

#### `registerUser(payload: RegisterPayload): Promise<AuthResponse>`
- Makes POST request to `/api/auth/register/`
- Payload includes: `username`, `email`, `password`, `role` (optional, defaults to 'cliente')
- Returns user data and JWT tokens (access + refresh)
- Handles both network and backend validation errors

#### Token Management Functions
- `storeTokens(response: AuthResponse)`: Saves access and refresh tokens to localStorage
- `getAccessToken()`: Retrieves access token from localStorage
- `getRefreshToken()`: Retrieves refresh token from localStorage
- `clearTokens()`: Removes tokens (logout)
- `isAuthenticated()`: Checks if valid access token exists

**Error Handling**:
- Network errors: Returns `{ message: 'Network error', errors: {} }`
- Backend validation errors: Extracts error messages from response
- Server errors: Returns error details with field-specific messages

**TypeScript Interfaces**:
```typescript
interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role?: string;
}

interface AuthResponse {
  user: User;
  refresh: string;
  access: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
}
```

### 3. Register Component (`/src/components/Auth/Register.tsx`)
**Updates**: Component now integrates with backend registration API.

**Key Changes**:
- Imports `registerUser` and `storeTokens` from authService
- Updated `handleSubmit()` to call backend API instead of mock localStorage
- Added loading state (`isLoading`) - disables buttons and shows spinner during request
- Added error handling with field-specific and general error display
- Extracts username from email prefix (e.g., user@example.com → user)
- On success: stores tokens, clears form, navigates to home page
- On error: displays error messages and field-specific validation errors from backend

**UI Improvements**:
- Error Alert component displays general registration failures
- CircularProgress spinner shows during API request
- Back button disabled during loading
- Clear error messages from backend validation (e.g., "This email is already registered")

## Registration Flow

```
User fills form (3 steps)
    ↓
Validation on each step (client-side)
    ↓
Submit button clicked on step 3
    ↓
handleSubmit() → registerUser(payload)
    ↓
API Request to POST /api/auth/register/
    ↓
Backend Response
    ├─ Success (200): Returns { user, access, refresh }
    │   ├─ storeTokens() saves to localStorage
    │   ├─ Form cleared
    │   └─ Navigate to home page
    │
    └─ Error: Display error message
        ├─ Field-specific errors shown in form
        └─ General error shown in Alert
```

## Token Storage

Tokens are stored in localStorage with keys:
- `accessToken`: Short-lived JWT token for API requests (expires ~5min)
- `refreshToken`: Long-lived token to obtain new access tokens

**Note**: For production, consider:
- Using HttpOnly cookies instead of localStorage (more secure)
- Implementing automatic token refresh on expiry
- Adding 401 interceptor to refresh tokens when needed

## Next Steps for Full Integration

1. **Update AuthContext**:
   - Store user data and authentication state globally
   - Create `useAuth()` hook for components

2. **Add Auth Headers to API Requests**:
   - Create helper to include `Authorization: Bearer <access_token>` header
   - Apply to all authenticated endpoints (orders, profile, etc.)

3. **Implement Token Refresh Logic**:
   - Detect when access token expires (401 response)
   - Use refresh token to obtain new access token
   - Auto-retry original request

4. **Add Logout Functionality**:
   - Clear tokens from localStorage
   - Clear user from AuthContext
   - Navigate to login page

5. **Protected Routes**:
   - Create PrivateRoute component
   - Check `isAuthenticated()` before rendering protected pages
   - Redirect to login if not authenticated

## Testing the Registration

1. **Development**:
   ```bash
   npm run dev
   ```
   - Navigate to `/register`
   - Fill form with valid data
   - Backend must be running at `http://127.0.0.1:8000/api`

2. **Check Network**:
   - Open DevTools (F12)
   - Network tab
   - Look for `POST /api/auth/register/` request
   - Verify response includes `access`, `refresh`, and `user` fields

3. **Verify Token Storage**:
   - DevTools → Application → LocalStorage
   - Check for `accessToken` and `refreshToken` keys

## Error Scenarios

| Scenario | Response | User Sees |
|----------|----------|-----------|
| Email already exists | `400 { errors: { email: [...] } }` | Field error under email |
| Invalid email format | `400 { errors: { email: [...] } }` | "Please enter a valid email" |
| Weak password | `400 { errors: { password: [...] } }` | Field error under password |
| Network error | Network failure | "Registration failed. Please try again." |
| Server error | `500` | General error alert |

## Files Modified

- ✅ `/.env` - Created development environment config
- ✅ `/.env.production` - Created production environment config
- ✅ `/src/services/authService.ts` - Created auth service
- ✅ `/src/components/Auth/Register.tsx` - Updated with backend integration
- ✅ `/src/context/AuthContext.tsx` - Fixed unused import
- ✅ `/src/pages/HomePage.tsx` - Fixed ProductList import path

## Build Status
✅ Build successful - no TypeScript errors
✅ All imports properly resolved
✅ Ready for testing with Django backend
