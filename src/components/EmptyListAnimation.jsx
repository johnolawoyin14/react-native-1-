import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTFAMILY ,FONTSIZE,COLORS} from '../theme/theme'
import LottieView from 'lottie-react-native'

const EmptyListAnimation = ({title}) => {
  return (
    <View style={styles.EmptyCartContainer}>
<LottieView style={styles.LottieStyle} autoPlay loop source={require("../lottie/coffeecup.json")}/>
<Text style={styles.LottieText}>{title}</Text>

    </View>
  )
}

export default EmptyListAnimation

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  LottieStyle: {
    height: 300,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});