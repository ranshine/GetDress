import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductListScreen, ProductCartScreen} from '../screens';
import {PRODUCT_CART, PRODUCT_LIST} from './Routes';
import {PRODUCTS_CART, PRODUCTS_TITLE} from '../utils/AppConstants';

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
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={PRODUCT_LIST}
              component={ProductListScreen}
              options={{title: `${PRODUCTS_TITLE}`}}
            />
            <Stack.Screen
              name={PRODUCT_CART}
              component={ProductCartScreen}
              options={{title: `${PRODUCTS_CART}`}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
});
export default AppNavigator;
