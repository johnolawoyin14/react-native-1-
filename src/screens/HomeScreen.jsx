import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useStore} from '../store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcons from '../components/CustomIcons';
import CoffeeCard from '../components/CoffeeCard';

const getCartegoriesFromData = data => {
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let cartegories = Object.keys(temp);
  cartegories.unshift('All');
  return cartegories;
};
const getCoffeeList = (cartegory, data) => {
  if (cartegory == 'All') {
    return data;
  } else {
    let coffeeList = data.filter(item => item.name == cartegory);
    return coffeeList;
  }
};
const HomeScreen = () => {
  const CoffeeList = useStore(state => state.CoffeeList);
  const BeansList = useStore(state => state.BeansList);
  const [cartegories, setCartegories] = useState([
    getCartegoriesFromData(CoffeeList),
  ]);
  const [searchText, setSearchText] = useState('');
  const [cartegoryIndex, setCartegoryIndex] = useState({
    index: 0,
    cartegory: cartegories[0][0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(cartegoryIndex.cartegory, CoffeeList),
  );
  // console.log(sortedCoffee.length)


  const ListRef=useRef(null)
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee=(search)=>{
    if (search!=""){
  ListRef?.current?.scrollToOffset({
    animated: true,
    offset: 0,
  });
  setCartegoryIndex({index:0,cartegory:cartegories[0]})
  setSortedCoffee([...CoffeeList.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))])
    }
  }
  const resetSearchCoffe=()=>{
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
      setCartegoryIndex({index: 0, cartegory: cartegories[0]});
        setSortedCoffee([
          ...CoffeeList
        ]);
        setSearchText("")

  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}coffee for you
        </Text>

        {/* SearchInput */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {
            searchCoffee(searchText)
          }}>
            <Icon
              style={styles.InputIcon}
              name="search1"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Coffee..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length>0?<TouchableOpacity onPress={()=>{resetSearchCoffe()}}>
            <Icon name='close' size={FONTSIZE.size_16} style={styles.InputIcon} color={COLORS.primaryLightGreyHex}/>
          </TouchableOpacity>:<></>}
        </View>
        {/* cartegory scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CartegoryScrollViewStyle}>
          {cartegories[0].map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CartegoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CartegoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated:true,
                    offset:0
                  })
                  setCartegoryIndex({
                    index: index,
                    cartegory: cartegories[0][index],
                  });
                  setSortedCoffee([
                    ...getCoffeeList(cartegories[0][index], CoffeeList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CartegoryText,
                    cartegoryIndex.index == index
                      ? {color: COLORS.primaryOrangeHex}
                      : {},
                  ]}>
                  {data}
                </Text>
                {cartegoryIndex.index == index ? (
                  <View style={styles.ActiveCartegory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* Coffee flast list */}
        <FlatList
        ref={ListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          ListEmptyComponent={<View style={styles.EmptyListContainer}>
            <Text style={styles.CartegoryText}>No coffee Available</Text>
          </View>}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <CoffeeCard
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  id={item.id}
                  index={item.index}
                  price={item.prices[0]}
                  type={item.type}
                  rosted={item.roasted}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        {/* Bean flast list */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeansList}
          contentContainerStyle={[styles.FlatListContainer,{marginBottom:tabBarHeight}]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <CoffeeCard
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  id={item.id}
                  index={item.index}
                  price={item.prices[0]}
                  type={item.type}
                  rosted={item.roasted}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    margin: SPACING.space_30,
    borderRadius: 20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CartegoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CartegoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CartegoryScrollViewItem: {
    alignItems: 'center',
  },
  CartegoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCartegory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: 10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  CoffeeBeansTitle:{
    fontSize:FONTSIZE.size_18,
    marginLeft:SPACING.space_30,
    marginRight:SPACING.space_20,
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.secondaryLightGreyHex
  },
});
export default HomeScreen;
