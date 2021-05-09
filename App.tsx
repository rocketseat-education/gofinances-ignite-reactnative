import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { 
  useFonts, 
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/styles/theme';
import Routes  from './src/routes';
import AppProvider from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <StatusBar barStyle="light-content" />
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}