import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { ScreenNames, RootStackParamList } from '../navigation/types';

type SimpleNavigateArgs =
  | [screen: keyof RootStackParamList]
  | [screen: keyof RootStackParamList, params?: object];

type NestedNavigateArgs = [
  stack: keyof RootStackParamList,
  options: {
    screen: keyof RootStackParamList;
    params?: object;
  },
];

const validScreens = Object.values(ScreenNames);

export function useSafeNavigation() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function safeNavigate(...args: SimpleNavigateArgs | NestedNavigateArgs) {
    try {
      if (
        typeof args[1] === 'object' &&
        args[1] !== null &&
        'screen' in args[1]
      ) {
        // Nested navigation
        const [stack, nested] = args as NestedNavigateArgs;

        const isValid =
          validScreens.includes(stack) && validScreens.includes(nested.screen);

        if (!isValid) {
          throw new Error('Invalid nested navigation');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigation.navigate(stack as any, {
          screen: nested.screen,
          params: nested.params,
        });
      } else {
        // Simple screen navigation
        const [screen, params] = args as SimpleNavigateArgs;

        const isValid = validScreens.includes(screen);

        if (!isValid) {
          throw new Error('Invalid screen navigation');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigation.navigate(screen as any, params);
      }
    } catch (error) {
      console.warn('Navigation failed, redirecting to NotFound:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigation.navigate(ScreenNames.NotFound as any);
    }
  }

  return {
    ...navigation,
    safeNavigate,
  };
}
