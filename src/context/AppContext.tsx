/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationDictionary } from '../translations';
import { BasketItem } from '../types';

export interface AppUser {
  name: string;
  email: string;
  companyName: string;
  sector: string;
  phone?: string;
  createdAt: string;
}

type Language = 'en' | 'tr';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  t: TranslationDictionary;
  selectedIotUseCase: string | null;
  setSelectedIotUseCase: (id: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  basket: BasketItem[];
  addToBasket: (item: Omit<BasketItem, 'quantity'>) => void;
  removeFromBasket: (itemId: string) => void;
  updateBasketQuantity: (itemId: string, quantity: number) => void;
  clearBasket: () => void;
  isBasketOpen: boolean;
  setBasketOpen: (open: boolean) => void;
  currentUser: AppUser | null;
  setCurrentUser: (user: AppUser | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedIotUseCase, setSelectedIotUseCase] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isBasketOpen, setBasketOpen] = useState(false);
  const [currentUser, setCurrentUserState] = useState<AppUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('x_elektrik_lang');
    if (savedLang === 'en' || savedLang === 'tr') {
      setLanguageState(savedLang);
    }
    const savedTheme = localStorage.getItem('x_elektrik_theme');
    const initialTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    setThemeState(initialTheme);
    const root = window.document.documentElement;
    if (initialTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const savedBasket = localStorage.getItem('x_elektrik_basket');
    if (savedBasket) {
      try {
        setBasket(JSON.parse(savedBasket));
      } catch (e) {
        console.error('Error parsing saved basket', e);
      }
    }
    const savedUser = localStorage.getItem('x_elektrik_user');
    if (savedUser) {
      try {
        setCurrentUserState(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved user', e);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('x_elektrik_lang', language);
    }
  }, [language, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('x_elektrik_theme', theme);
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('x_elektrik_basket', JSON.stringify(basket));
    }
  }, [basket, isHydrated]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'tr' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addToBasket = (item: Omit<BasketItem, 'quantity'>) => {
    setBasket((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromBasket = (itemId: string) => {
    setBasket((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateBasketQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(itemId);
      return;
    }
    setBasket((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const setCurrentUser = (user: AppUser | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('x_elektrik_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('x_elektrik_user');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        theme,
        toggleLanguage,
        setLanguage,
        toggleTheme,
        t,
        selectedIotUseCase,
        setSelectedIotUseCase,
        selectedCategory,
        setSelectedCategory,
        basket,
        addToBasket,
        removeFromBasket,
        updateBasketQuantity,
        clearBasket,
        isBasketOpen,
        setBasketOpen,
        currentUser,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
