export { StorageHelper } from './StorageHelper';

// Scaling utilities
import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Base dimensions (iPhone 12 Pro)
const baseWidth = 390;
const baseHeight = 844;

export const horizontalScale = (size: number) => (screenWidth / baseWidth) * size;
export const verticalScale = (size: number) => (screenHeight / baseHeight) * size;
export const moderateScale = (size: number, factor: number = 0.5) => size + (horizontalScale(size) - size) * factor;
