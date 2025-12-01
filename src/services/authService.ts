const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role?: string;
  // 👇 1. AGREGAMOS ESTOS CAMPOS A LA INTERFAZ
  address?: string;
  phone?: string;
  // Campos opcionales para notificaciones
  wpp?: string | null;
  notifyEmail?: string | null;
}

export interface User {
  username: string;
  email: string;
  role: string;
  id?: number;
  // 👇 2. TAMBIÉN AQUÍ (Para que Typescript sepa que el usuario los tiene)
  address?: string;
  phone?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  refresh: string;
  access: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Register a new user and retrieve JWT tokens
 */
export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        role: payload.role || 'cliente',
        // 👇 3. AGREGAMOS LOS DATOS AL JSON QUE SE ENVÍA AL BACKEND
        address: payload.address || '', 
        phone: payload.phone || ''
        ,
        notifications:{
          wpp: payload.wpp ?? null,
          notifyEmail: payload.notifyEmail ?? null,
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw {
        message: error.detail || 'Error al registrarse',
        errors: error,
      };
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      throw {
        message: 'Error de conexion: No se pudo contactar al servidor',
        errors: {},
      };
    }
    throw error;
  }
};

/**
 * Login user with username and password
 */
export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw {
        message: error.detail || 'Error al iniciar sesion',
        errors: error,
      };
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      throw {
        message: 'Error de conexion: No se pudo contactar al servidor',
        errors: {},
      };
    }
    throw error;
  }
};

/**
 * Store auth object in localStorage
 * Structure saved:
 * {
 * client_id: number | null,
 * username: string,
 * access_token: string,
 * refresh_token: string
 * }
 */
export const AUTH_STORAGE_KEY = 'auth';

export const storeTokens = (data: AuthResponse) => {
  const authObj = {
    client_id: data.user?.id ?? null,
    username: data.user?.username ?? '',
    access_token: data.access,
    refresh_token: data.refresh,
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authObj));
};

/**
 * Retrieve access token from localStorage
 */
export const getAccessToken = (): string | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { access_token?: string };
    return parsed.access_token ?? null;
  } catch (e) {
    return null;
  }
};

/**
 * Retrieve refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { refresh_token?: string };
    return parsed.refresh_token ?? null;
  } catch (e) {
    return null;
  }
};

/**
 * Return the full auth object stored in localStorage or null
 */
export const getAuthObject = (): { client_id: number | null; username: string; access_token: string; refresh_token: string } | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const getClientId = (): number | null => {
  const auth = getAuthObject();
  return auth?.client_id ?? null;
};

export const getUsername = (): string | null => {
  const auth = getAuthObject();
  return auth?.username ?? null;
};

/**
 * Clear tokens from localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// export interface RegisterPayload {
//   username: string;
//   email: string;
//   password: string;
//   role?: string;
// }

// export interface User {
//   username: string;
//   email: string;
//   role: string;
//   id?: number;
// }

// export interface LoginPayload {
//   username: string;
//   password: string;
// }

// export interface AuthResponse {
//   user: User;
//   refresh: string;
//   access: string;
// }

// export interface AuthError {
//   message: string;
//   errors?: Record<string, string[]>;
// }

// /**
//  * Register a new user and retrieve JWT tokens
//  */
// export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
//   try {
//     const response = await fetch(`${API_URL}/auth/register/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: payload.username,
//         email: payload.email,
//         password: payload.password,
//         role: payload.role || 'cliente',
        
//       }),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw {
//         message: error.detail || 'Registration failed',
//         errors: error,
//       };
//     }

//     const data: AuthResponse = await response.json();
//     return data;
//   } catch (error: unknown) {
//     if (error instanceof TypeError) {
//       throw {
//         message: 'Network error: Unable to reach the server',
//         errors: {},
//       };
//     }
//     throw error;
//   }
// };

// /**
//  * Login user with username and password
//  */
// export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
//   try {
//     const response = await fetch(`${API_URL}/auth/login/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw {
//         message: error.detail || 'Login failed',
//         errors: error,
//       };
//     }

//     const data: AuthResponse = await response.json();
//     return data;
//   } catch (error: unknown) {
//     if (error instanceof TypeError) {
//       throw {
//         message: 'Network error: Unable to reach the server',
//         errors: {},
//       };
//     }
//     throw error;
//   }
// };

// /**
//  * Store auth object in localStorage
//  * Structure saved:
//  * {
//  *   client_id: number | null,
//  *   username: string,
//  *   access_token: string,
//  *   refresh_token: string
//  * }
//  */
// export const AUTH_STORAGE_KEY = 'auth';

// export const storeTokens = (data: AuthResponse) => {
//   const authObj = {
//     client_id: data.user?.id ?? null,
//     username: data.user?.username ?? '',
//     access_token: data.access,
//     refresh_token: data.refresh,
//   };

//   localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authObj));
// };

// /**
//  * Retrieve access token from localStorage
//  */
// export const getAccessToken = (): string | null => {
//   const raw = localStorage.getItem(AUTH_STORAGE_KEY);
//   if (!raw) return null;
//   try {
//     const parsed = JSON.parse(raw) as { access_token?: string };
//     return parsed.access_token ?? null;
//   } catch (e) {
//     return null;
//   }
// };

// /**
//  * Retrieve refresh token from localStorage
//  */
// export const getRefreshToken = (): string | null => {
//   const raw = localStorage.getItem(AUTH_STORAGE_KEY);
//   if (!raw) return null;
//   try {
//     const parsed = JSON.parse(raw) as { refresh_token?: string };
//     return parsed.refresh_token ?? null;
//   } catch (e) {
//     return null;
//   }
// };

// /**
//  * Return the full auth object stored in localStorage or null
//  */
// export const getAuthObject = (): { client_id: number | null; username: string; access_token: string; refresh_token: string } | null => {
//   const raw = localStorage.getItem(AUTH_STORAGE_KEY);
//   if (!raw) return null;
//   try {
//     return JSON.parse(raw);
//   } catch (e) {
//     return null;
//   }
// };

// export const getClientId = (): number | null => {
//   const auth = getAuthObject();
//   return auth?.client_id ?? null;
// };

// export const getUsername = (): string | null => {
//   const auth = getAuthObject();
//   return auth?.username ?? null;
// };

// /**
//  * Clear tokens from localStorage
//  */
// export const clearTokens = () => {
//   localStorage.removeItem(AUTH_STORAGE_KEY);
// };

// /**
//  * Check if user is authenticated
//  */
// export const isAuthenticated = (): boolean => {
//   return !!getAccessToken();
// };
