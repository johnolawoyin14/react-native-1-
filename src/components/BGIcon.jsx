import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../theme/theme'
import CustomIcons from './CustomIcons'
import Icon from "react-native-vector-icons/MaterialIcons"

const BGIcon = ({name,color,size,BGColor}) => {
  return (
    <View style={[styles.IconBG,{backgroundColor:BGColor}]}>
        <Icon name={name} color={color} size={size}/>
    </View>
  )
}

const styles = StyleSheet.create({
    IconBG:{
        height:SPACING.space_30,
        width:SPACING.space_30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:BORDERRADIUS.radius_8
    
    }
})

export default BGIcon