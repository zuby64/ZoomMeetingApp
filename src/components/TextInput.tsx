import React, { forwardRef } from 'react';
import {
  TextInput as RTextInput,
  StyleProp,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle
} from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { borderSizes } from '../core/theme';
import { moderateScale, verticalScale } from '../utils';
import { isRTL } from '../constant';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  allowSpecialCharacter?: boolean;
  allowOnlyAlphanumeric?: boolean; // New prop
}

const TextInput = forwardRef<RTextInput, CustomTextInputProps>(({
  style,
  containerStyle,
  value,
  onChangeText,
  secureTextEntry,
  allowSpecialCharacter = true,
  allowOnlyAlphanumeric = false, // Default false
  ...rest
}, ref) => {
  const { theme } = useAppTheme();

  const handleTextChange = (text: string) => {
    if (secureTextEntry || rest.keyboardType === 'email-address') {
      onChangeText?.(text);
    } else if (rest.keyboardType === 'numeric' || rest.keyboardType === 'decimal-pad') {
      const sanitizedText = text.replace(/[^0-9.]/g, '');
      const decimalCount = (sanitizedText.match(/\./g) || []).length;

      if (decimalCount <= 1) {
        onChangeText?.(sanitizedText);
      } else {
        onChangeText?.(sanitizedText.slice(0, sanitizedText.lastIndexOf('.')));
      }
    } else if (allowOnlyAlphanumeric) {
      // Allow only letters and numbers, no spaces or symbols
      const sanitizedText = text.replace(/[^a-zA-Z0-9]/g, '');
      onChangeText?.(sanitizedText);
    } else {
      if (allowSpecialCharacter) {
        onChangeText?.(text);
      } else {
        const sanitizedText = text.replace(/[^a-zA-Z0-9. ]/g, '');
        onChangeText?.(sanitizedText);
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <RTextInput
        {...rest}
        ref={ref}
        style={[styles.textInput, { borderColor: theme.colors.dophin }, style, { color: theme.colors.mirage, textAlign: isRTL ? 'right' : 'left' }]}
        placeholderTextColor={theme.colors.mirage}
        value={value}
        onChangeText={handleTextChange}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInput: {
    borderWidth: moderateScale(1),
    paddingLeft: moderateScale(17),
    height: verticalScale(36),
    borderRadius: borderSizes.primaryBorder,
  },
});

export default TextInput;
