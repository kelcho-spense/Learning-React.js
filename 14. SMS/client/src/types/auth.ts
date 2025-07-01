export interface TLoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  },
  user: {
    id: string;
    email: string;
    role: string;
  }
}

// Add error types for better error handling
export interface AuthError {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

export class LoginError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'LoginError';
  }
}
