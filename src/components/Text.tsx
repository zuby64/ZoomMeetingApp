import React from 'react';
import {TextProps as RNTextProps, StyleSheet} from 'react-native';
import {fontFamilies, fontSizes} from '../core/theme';
import {FontWeights} from '../core/theme';
import {Text as RNText} from 'react-native';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
}

const Text = ({style, ...props}: TextProps) => <RNText {...props} style={[styles.text, style]} />;

Text.H1 = ({style, ...props}: TextProps) => <Text {...props} style={[styles.h1, style]} />;
Text.H2 = ({style, ...props}: TextProps) => <Text {...props} style={[styles.h2, styles.commonStyle, style]} />;
Text.H3 = ({style, ...props}: TextProps) => <Text {...props} style={[styles.h3, styles.commonStyle, style]} />;
Text.H4 = ({style, ...props}: TextProps) => <Text {...props} style={[styles.h4, styles.commonStyle, style]} />;
Text.P1 = ({style, ...props}: TextProps) => <Text {...props} style={[styles.p1, styles.commonStyle, style]} />;
Text.Span = ({style, ...props}: TextProps) => <Text {...props} style={[styles.span, styles.commonStyle, style]} />;

export default Text;
const styles = StyleSheet.create({
  text: {},
  h1: {
    fontFamily: fontFamilies.KodChasanBold,
    fontWeight: FontWeights.weight700,
    fontSize: fontSizes.extraLarge,
  },
  h2: {
    fontFamily: fontFamilies.Regular,
    fontSize: fontSizes.extraLarge,
    fontWeight: FontWeights.weight600,
  },
  h3: {
    fontSize: fontSizes.regular,
    fontFamily: fontFamilies.Regular,
    fontWeight: FontWeights.weight600,
  },
  h4: {
    fontWeight: FontWeights.weight400,
    fontFamily: fontFamilies.Regular,
    fontSize: fontSizes.regular,
  },
  p1: {
    fontWeight: FontWeights.weight500,
    fontFamily: fontFamilies.Regular,
    fontSize: fontSizes.regular,
  },
  span: {
    fontWeight: FontWeights.weight300,
    fontFamily: fontFamilies.Regular,
    fontSize: fontSizes.small,
  },
  //note : these are commone with h2 and h3 only their size is change...
  commonStyle: {
    fontFamily: fontFamilies.SemiBold,
  },
});
