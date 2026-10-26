import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  verified: boolean;
  domain?: string;
  studentPrn?: string;
}

interface AuthContextType {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  loginWithGoogle: (customEmail?: string, customName?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AUTH_STORAGE_KEY = 'pcu_google_auth_user_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  // Load Google Identity Services SDK if client ID is configured
  useEffect(() => {
    const handleGoogleCredentialResponse = (response: any) => {
      try {
        // Decode base64 payload from JWT token
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const data = JSON.parse(jsonPayload);

        const googleUser: GoogleUser = {
          id: data.sub || `g-${Date.now()}`,
          name: data.name || data.given_name || 'Google User',
          email: data.email,
          picture: data.picture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=pcu',
          verified: data.email_verified || true,
          domain: data.hd || (data.email.endsWith('@pcu.edu.in') ? 'pcu.edu.in' : undefined),
          studentPrn: `PCU2024${Math.floor(1000 + Math.random() * 9000)}`
        };

        setUser(googleUser);
        setIsAuthModalOpen(false);
      } catch (err) {
        console.error('Error parsing Google Identity credential', err);
      }
    };

    if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1048294829482-example.apps.googleusercontent.com';
      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false
      });
    }
  }, []);

  const loginWithGoogle = (customEmail?: string, customName?: string) => {
    const email = customEmail || 'disha.nichite19@gmail.com';
    const name = customName || 'Disha Nichite';
    const isPcuDomain = email.endsWith('@pcu.edu.in');

    const mockGoogleUser: GoogleUser = {
      id: `google-${Date.now()}`,
      name: name,
      email: email,
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=002147`,
      verified: true,
      domain: isPcuDomain ? 'pcu.edu.in' : 'gmail.com',
      studentPrn: isPcuDomain ? 'PCU2024ENG0192' : 'PCU2024ENG0142'
    };

    setUser(mockGoogleUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loginWithGoogle,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
