import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { securityManager } from "@/utils/security";
import { cookieManager } from "@/utils/cookies";

export interface AuthUser {
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "tm_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // Try to decrypt the stored user data
        const decryptedUser = securityManager.decrypt(stored);
        setUser(JSON.parse(decryptedUser));
      }
    } catch {
      // If decryption fails, try parsing as plain JSON (backward compatibility)
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch {}
    }
  }, []);

  const signIn = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
    try {
      // Encrypt user data before storing
      const encryptedUser = securityManager.encrypt(JSON.stringify(nextUser));
      localStorage.setItem(STORAGE_KEY, encryptedUser);
      
      // Generate and store secure session token
      const sessionToken = securityManager.generateSessionToken();
      cookieManager.setSecureToken('session_token', sessionToken);
      
      // Set analytics cookie if consent given
      cookieManager.setAnalyticsCookie('user_session', 'active');
    } catch {}
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Clear secure session token
      cookieManager.deleteCookie('session_token');
      // Clear analytics cookies
      cookieManager.deleteCookie('user_session');
    } catch {}
  }, []);

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};





