'use client';

// Mock auth service that accepts any valid email/password
export const auth = {
  signUp: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful signup
    return {
      data: { user: { id: 'mock-user-id', email } },
      error: null
    };
  },

  signIn: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful login
    return {
      data: { user: { id: 'mock-user-id', email } },
      error: null
    };
  },

  getUser: async () => {
    return {
      data: { user: { id: 'mock-user-id', email: 'mock@example.com' } },
      error: null
    };
  }
};