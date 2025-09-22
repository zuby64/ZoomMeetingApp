import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Localization from 'expo-localization'; // ✅ Expo-compatible
import { Languages, StorageKeys } from '@constant';
import { StorageHelper } from '@utils';
import { initializeTranslations } from '118n';

SplashScreen.preventAutoHideAsync(); // Keep splash visible until initialization is done

export const useBootApplication = () => {
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    const bootLanguage = async () => {
      try {
        const lang = await StorageHelper.getStorageItem(
          StorageKeys.APP_LANGUAGE,
        );

        const deviceLanguage =
          Localization.getLocales()?.[0]?.languageCode || 'en'; // ✅ Safe fallback

        if (!lang) {
          await StorageHelper.setStorageItem(
            StorageKeys.APP_LANGUAGE,
            deviceLanguage,
          );
        }

        await initializeTranslations((lang || deviceLanguage) as Languages);

        setInitialized(true);
      } catch (err) {
        console.error('Boot error:', err);
      } finally {
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    };

    bootLanguage();

    return () => setInitialized(false);
  }, []);

  return {
    isInitialized,
  };
};
