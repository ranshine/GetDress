import React from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNetInfo} from '@react-native-community/netinfo';

interface ScreenProps {
  hasScrollView: boolean;
  children: React.ReactNode;
}

export const Screen = ({children, hasScrollView}: ScreenProps) => {
  const netInfo = useNetInfo();

  const renderNetworkBanner = (): JSX.Element => {
    if (netInfo.isConnected != null && !netInfo.isConnected) {
      return (
        <View>
          <Text>Network not </Text>
        </View>
      );
    }
    return <></>;
  };

  if (!hasScrollView) {
    return (
      <View>
        {children}
        {renderNetworkBanner()}
      </View>
    );
  }
  return (
    <View>
      <KeyboardAwareScrollView>
        {children}
        {renderNetworkBanner()}
      </KeyboardAwareScrollView>
    </View>
  );
};
