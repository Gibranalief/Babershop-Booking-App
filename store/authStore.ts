import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin, type AuthResponse, type User, ApiError } from '@/lib/api';

type Role = 'user' | 'barber' | null;

interface AuthState {
  token: string | null;
  hasHydrated: boolean;
  role: Role | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ role: Role }>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      role: null,
      user: null,
      isLoading: false,
      error: null,
      hasHydrated: false,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data: AuthResponse = await apiLogin(email, password);

          // Map backend role to frontend role
          const role: Role = data.user.role === 'BARBER' ? 'barber' : 'user';

          set({
            token: data.access_token,
            role,
            user: data.user,
            isLoading: false,
            error: null,
          });

          // Store in cookies for middleware protection
          if (typeof document !== 'undefined') {
            document.cookie = `token=${data.access_token}; path=/; max-age=604800; SameSite=Lax`;
            document.cookie = `role=${role}; path=/; max-age=604800; SameSite=Lax`;
          }

          return { role };
        } catch (err: any) {
          const message =
            err instanceof ApiError
              ? err.message
              : 'Network error. Please check your connection.';
          set({ error: message, isLoading: false });
          throw err;
        }
      },
      logout: () => {
        set({ token: null, role: null, user: null, error: null });
        // Clear token from api layer
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        if (typeof document !== 'undefined') {
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
      },
      loadUser: async () => {
        const { token } = get();
        if (!token) return;
        
        try {
          // Import getProfile dynamically or directly above if available
          const { getProfile } = await import('@/lib/api');
          const user = await getProfile();
          set({ user });
        } catch (err) {
          get().logout(); // Token invalid or expired
        }
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
  onRehydrateStorage: () => (state) => {
    if (state) {
      state.hasHydrated = true;
    }
  },
    }
  )
);
