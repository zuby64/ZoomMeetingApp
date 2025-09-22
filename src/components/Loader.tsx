import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useAppTheme } from '@hooks/useAppTheme';
type LoadingProps = {
  size?: 'small' | 'large' | number;
};

export const Loader = ({ size }: LoadingProps) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <ActivityIndicator color={theme.colors.primary} size={size ?? 'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
