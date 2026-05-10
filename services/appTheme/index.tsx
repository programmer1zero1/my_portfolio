import type {AppColors} from '@/constants/Colors';
import {Colors} from '@/constants/Colors';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {Appearance} from 'react-native';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'custom';
  colors: AppColors;
  setThemeManually: (newTheme: 'light' | 'dark') => void;
  setCustomBackground: (color: string) => void;
  setCustomTheme: (newColors: Partial<AppColors>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'custom'>(
    (Appearance.getColorScheme() as 'light' | 'dark') || 'light',
  );
  const [customColors, setCustomColors] =
    useState<Partial<AppColors>>(Colors.custom);
  const [customBackground, setCustomBackground] = useState<string | null>(null);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (colorScheme === 'light' || colorScheme === 'dark') {
        setTheme(colorScheme);
      }
    });
    return () => subscription.remove();
  }, []);

  const setThemeManually = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const setCustomTheme = (newColors: Partial<AppColors>) => {
    setCustomColors((prev: Partial<AppColors>) => ({...prev, ...newColors}));
    setTheme('custom');
  };

  const colors: AppColors =
    theme === 'custom'
      ? {
          ...Colors.custom,
          ...customColors,
          background: customColors.background ?? Colors.custom.brand,
        }
      : {
          ...Colors[theme],
          background: customBackground ?? Colors[theme].brand,
        };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        setThemeManually,
        setCustomBackground,
        setCustomTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
