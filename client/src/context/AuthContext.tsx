import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type StoredUser = {
  email: string;
  password: string;
  name: string;
};

type AuthUser = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  hasUsers: boolean;
  signUp: (user: { name:string; email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  signIn: (credentials: { email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  signOut: () => void;
};

const USERS_KEY = 'foodwaste_users';
const CURRENT_USER_KEY = 'foodwaste_current_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as StoredUser[];
  } catch {
    return [];
  }
}

function setUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser(): AuthUser | null {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

function setCurrentUser(user: AuthUser | null) {
  if (!user) return localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getCurrentUser());
  const [hasUsers, setHasUsers] = useState<boolean>(getUsers().length > 0);
  const navigate = useNavigate();

  useEffect(() => {
    const users = getUsers();
    setHasUsers(users.length > 0);
  }, []);

  const signUp = async ({ name, email, password }: { name:string; email: string; password: string }) => {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { success: false, message: 'User already exists, please sign in.' };
    }

    const nextUsers = [...users, { name, email: normalizedEmail, password }];
    setUsers(nextUsers);
    const authUser = { email: normalizedEmail, name };
    setUser(authUser);
    setCurrentUser(authUser);
    setHasUsers(true);

    // redirect to safe home app after registration
    navigate('/');
    return { success: true, message: 'Signup successful.' };
  };

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const users = getUsers();

    if (users.length === 0) {
      return { success: false, message: 'No users found. Please sign up first.' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const match = users.find((u) => u.email === normalizedEmail && u.password === password);

    if (!match) {
      return { success: false, message: 'Invalid credentials. Please try again or sign up.' };
    }

    const authUser = { email: match.email, name: match.name };
    setUser(authUser);
    setCurrentUser(authUser);

    // redirect to home/dashboard
    navigate('/');
    return { success: true, message: 'Signed in successfully.' };
  };

  const signOut = () => {
    setUser(null);
    setCurrentUser(null);
    navigate('/signin');
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      hasUsers,
      signUp,
      signIn,
      signOut,
    }),
    [user, hasUsers]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
