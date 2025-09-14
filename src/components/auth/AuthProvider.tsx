import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier';
  companyName: string;
  businessCategory: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  businessCategory: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('inventrak_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Simulate API call - In real app, this would be an actual API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const userData: User = {
      id: '1',
      name: 'John Doe',
      email,
      role: role as 'admin' | 'cashier',
      companyName: 'Demo Store',
      businessCategory: 'Kirana'
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('inventrak_user', JSON.stringify(userData));
    return true;
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'admin', // Default to admin for new signups
      companyName: userData.companyName,
      businessCategory: userData.businessCategory
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('inventrak_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('inventrak_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};