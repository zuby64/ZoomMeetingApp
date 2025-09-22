import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://'], // You can change these to your scheme and domain
  config: {
    screens: {
      Home: '',
      Profile: 'profile/:userId',
      NotFound: '*',
    },
  },
};

export default linking;
