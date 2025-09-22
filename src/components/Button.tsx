import React from 'react';
import {StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native';
import Text from './Text';
import {horizontalScale, verticalScale} from '../utils';
import {borderSizes} from '../core/theme';

interface ButtonProps extends TouchableOpacityProps {
  buttonText?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({buttonText, buttonStyle, textStyle, children, ...rest}) => {
  // Rendering either button text or children if provided
  const content = buttonText ? <Text.H4 style={[defaultTextStyle, textStyle]}>{buttonText}</Text.H4> : children;

  return (
    <TouchableOpacity {...rest} style={[defaultButtonStyle, buttonStyle, rest.style]}>
      {content}
    </TouchableOpacity>
  );
};

// Default button style
const defaultButtonStyle: StyleProp<ViewStyle> = {
   paddingVertical: verticalScale(10),
  paddingHorizontal: horizontalScale(20),
  borderRadius: borderSizes.primaryBorder,
  backgroundColor: 'rgba(76, 0, 85, 0.2)',
};

const defaultTextStyle: StyleProp<TextStyle> = {
  textAlign: 'center',
};
