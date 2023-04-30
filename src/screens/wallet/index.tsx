import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//Custom Imports
import color from '../../constants/color'
import fontFamily from '../../constants/fontFamily'
import { workInProgress } from '../../constants/strings'

type Props = {}

const Wallet = (props: Props) => {
  return (
    <View style = {styles.container}>
      <Text style = {styles.textStyle}>{workInProgress}</Text>
    </View>
  )
}

export default Wallet;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle:{
    color: color.primary,
    fontFamily: fontFamily.medium,
    fontSize: 18
  }
})