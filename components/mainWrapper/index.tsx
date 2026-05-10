import {useScreenLayout} from 'expo-responsive-window';
import {
  type ReactNode,
  memo,
  useEffect,
  useState,
} from 'react';
import {
  Keyboard,
  type ColorValue,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import Button from '../button';

export type MainWrapperProps = {
  children: ReactNode;
  showButton?: boolean;
  buttonLabel?: string;
  onPressButton?: () => void;
  enableScroll?: boolean;
  disabled?: boolean;
  enableKeyboardToolbar?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  /** When set, fills the main area; omit to let {@link ParentWrapper} show through. */
  backgroundColor?: ColorValue;
  /** Applied to the outer container (e.g. `alignItems` for centered lists). */
  style?: StyleProp<ViewStyle>;
};

const MainWrapper = memo(function MainWrapper({
  children,
  showButton,
  buttonLabel = 'Next',
  onPressButton,
  enableScroll = false,
  enableKeyboardToolbar = false,
  disabled = false,
  buttonStyle,
  backgroundColor,
  style,
}: MainWrapperProps) {
  const {scaledHeight} = useScreenLayout();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    backgroundColor !== undefined ? {backgroundColor} : null,
    style,
  ];

  return (
    <View style={containerStyle}>
      {enableScroll ? (
        <KeyboardAwareScrollView
          bottomOffset={62}
          showsVerticalScrollIndicator={false}
          extraKeyboardSpace={100}
          enabled
          keyboardShouldPersistTaps="handled"
          style={styles.scroll}
          contentContainerStyle={styles.content}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View style={styles.fill}>{children}</View>
      )}

      {showButton ? (
        <Button
          label={buttonLabel || 'Next'}
          variant="brand"
          onPress={onPressButton}
          style={[buttonStyle, {marginBottom: scaledHeight(10)}]}
          disabled={disabled}
          loading={false}
        />
      ) : null}

      {keyboardVisible && enableKeyboardToolbar ? <KeyboardToolbar /> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fill: {
    flex: 1,
    flexGrow: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default MainWrapper;
