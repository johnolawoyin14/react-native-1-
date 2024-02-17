import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientIcon from './GradientBGIcon'
import { COLORS, FONTSIZE } from '../theme/theme'

const ImageBackgroundInfo = ({EnableBackHandler,ImageLinkPortrait,type,id,Favourite,name,special_ingredient,ingredient,average_rating,ratings_count,roasted,BackHandler,ToggleFavourite}) => {
  
  console.log(ImageLinkPortrait)
    return (
      <View>
          <ImageBackground
            source={ImageLinkPortrait}
            style={styles.ItemBackgroundImage}>
            {EnableBackHandler ? (
              <View>
                <TouchableOpacity>
                  <GradientIcon
                    name={'chevron-left'}
                    color={COLORS.primaryLightGreyHex}
                    size={FONTSIZE.size_16}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <GradientIcon
                    name={'heart'}
                    color={COLORS.primaryLghtGreyHex}
                    size={FONTSIZE.size_16}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </ImageBackground>
      </View>
    );
}

export default ImageBackgroundInfo

const styles = StyleSheet.create({
    ItemBackgroundImage:{
        width:"100%",
        aspectRatio:20 / 25,
        justifyContent:"space-between"
    }
})