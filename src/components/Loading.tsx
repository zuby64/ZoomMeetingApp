import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {useAppTheme} from '../hooks/useAppTheme';
import Text from './Text';

type LoadingProps = {
  size?: 'small' | 'large' | number;
  text?: string;
};

export const Loading = ({size, text}: LoadingProps) => {
  const {theme} = useAppTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.primaryContainer}]}>
      <ActivityIndicator color={theme.colors.primary} size={size ?? 'large'} />
      {text && <Text.H4 style={styles.text}>{text}</Text.H4>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});
