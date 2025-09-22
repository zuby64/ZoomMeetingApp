// Define color palettes for light and dark themes

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  button: string;
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
  },
  fonts: {
    regular: 'Arial, sans-serif',
    bold: 'Arial-Bold, sans-serif',
  },
};

export { lightTheme, darkTheme };
