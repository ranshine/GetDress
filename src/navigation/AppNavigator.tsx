import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductListScreen, ProductCartScreen} from '../screens';
import {PRODUCT_CART, PRODUCT_LIST} from './Routes';

const Stack = createNativeStackNavigator();

const AppNavigator = (): JSX.Element => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={PRODUCT_LIST}
              component={ProductListScreen}
              options={{title: 'Products'}}
            />
            <Stack.Screen
              name={PRODUCT_CART}
              component={ProductCartScreen}
              options={{title: 'Product Cart'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default AppNavigator;
