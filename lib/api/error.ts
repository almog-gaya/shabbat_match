export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProfileError';
  }
}

export function handleError(error: any): Error {
  console.error('API Error:', error);
  
  if (error?.message) {
    return new Error(error.message);
  }
  
  return new Error('An unexpected error occurred');
}