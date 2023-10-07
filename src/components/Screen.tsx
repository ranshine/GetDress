import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface ScreenProps {
  hasScrollView: boolean;
  children: React.ReactNode;
}

export const Screen = ({children, hasScrollView}: ScreenProps) => {
  if (!hasScrollView) {
    return (
      <View>
        {children}
        {/* {renderNetworkBanner()} */}
      </View>
    );
  }
  return (
    <View>
      <KeyboardAwareScrollView>
        {children}
        {/* {renderNetworkBanner()} */}
      </KeyboardAwareScrollView>
    </View>
  );
};
