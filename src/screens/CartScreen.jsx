import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {SPACING, COLORS} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';

const CartScreen = () => {
  const CartList = useStore(state => state.CartList);
  const CartPrice = useStore(state => state.CartPrice);
  const IncrementCartItemQuantity = useStore(
    state => state.IncrementCartItemQuantity,
  );
  const decrementCartItemQuantities = useStore(
    state => state.decrementCartItemQuantities,
  );
  const calculateCartPrice = useStore(state => state.calculateCartPrice);
  const TabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: TabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />
            {CartList.length==0?<EmptyListAnimation title={"The Cart is Empty"}/>:<View style={styles.ListItemContainer}>
             
             {CartList.map(data=>{
              <TouchableOpacity key={data.id} onPress={()=>{}}>

              </TouchableOpacity>
             })}
              </View>}
            </View> 
            {CartList.length!=0?<PaymentFooter buttonTitle={"Pay"} price={{price:CartPrice, currency:"$"}}/>:<></>}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
