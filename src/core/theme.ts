// Define color palettes for light and dark themes

export const fontFamilies = {
  Regular: 'System',
  SemiBold: 'System',
  KodChasanBold: 'System',
};

export const fontSizes = {
  small: 12,
  regular: 16,
  extraLarge: 24,
};

export const FontWeights = {
  weight300: '300' as const,
  weight400: '400' as const,
  weight500: '500' as const,
  weight600: '600' as const,
  weight700: '700' as const,
};

export const borderSizes = {
  primaryBorder: 8,
};

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  button: string;
  border: string;
  placeholder: string;
  disabled: string;
  primaryContainer: string;
  dophin: string;
  mirage: string;
}

interface ThemeFonts {
  regular: string;
  bold: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    text: '#333333',
    primary: '#4C0055',
    secondary: '#FC5F3A',
    button: '#FE9303',
    border: '#CCCCCC',
    placeholder: '#999999',
    disabled: '#CCCCCC',
    primaryContainer: '#F3E5F5',
    dophin: '#CCCCCC',
    mirage: '#666666',
  },
  fonts: {
    regular: 'Arial, sans-serif',
    bold: 'Arial-Bold, sans-serif',
  },
};

const darkTheme: Theme = {
  colors: {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#4C0055',
    secondary: '#FC5F3A',
    button: '#FF6F00',
    border: '#444444',
    placeholder: '#888888',
    disabled: '#444444',
    primaryContainer: '#2D1B2E',
    dophin: '#666666',
    mirage: '#CCCCCC',
  },
  fonts: {
    regular: 'Arial, sans-serif',
    bold: 'Arial-Bold, sans-serif',
  },
};

export { lightTheme, darkTheme };
