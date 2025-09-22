import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme, Theme } from '../core/theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Create a named export for ThemeContext
export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
  setTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (defaultTheme === 'system') {
      return Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
    }
    return defaultTheme === 'dark' ? darkTheme : lightTheme;
  });

  const isDark = theme === darkTheme;

  const setTheme = (themeChoice: 'light' | 'dark') => {
    setThemeState(themeChoice === 'dark' ? darkTheme : lightTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === lightTheme ? darkTheme : lightTheme));
  };

  useEffect(() => {
    if (defaultTheme === 'system') {
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        setThemeState(colorScheme === 'dark' ? darkTheme : lightTheme);
      });
      return () => listener.remove();
    }
  }, [defaultTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
