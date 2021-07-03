declare module 'react-native-switch' {
  import { Component, ReactNode } from 'react';
  import { StyleProp, TextStyle, ViewStyle } from 'react-native';

  export interface SwitchProps {
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
    activeText?: string;
    inActiveText?: string;
    backgroundActive?: string;
    backgroundInactive?: string;
    value?: boolean;
    circleActiveColor?: string;
    circleInActiveColor?: string;
    circleSize?: number;
    circleBorderActiveColor?: string;
    circleBorderInactiveColor?: string;
    activeTextStyle?: StyleProp<TextStyle>;
    inactiveTextStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    barHeight?: number;
    circleBorderWidth?: number;
    renderInsideCircle?: () => ReactNode;
    changeValueImmediately?: boolean;
    innerCircleStyle?: StyleProp<ViewStyle>;
    outerCircleStyle?: StyleProp<ViewStyle>;
    renderActiveText?: boolean;
    renderInActiveText?: boolean;
    switchLeftPx?: number;
    switchRightPx?: number;
    switchWidthMultiplier?: number;
    switchBorderRadius?: number;
    testID?: string;
  }

  export class Switch extends Component<SwitchProps> {}
}
