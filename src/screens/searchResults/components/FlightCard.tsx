import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

//Custom Imports
import { travelSearchItemsType } from '../../../types/travelSearchDataTypes';

type Props = {
  item: travelSearchItemsType;
  index: number;
}

const FlightCard = ({ item, index }: Props) => {
  return (
    <View>
      <Text>FlightCard</Text>
    </View>
  )
}

export default memo(FlightCard);

const styles = StyleSheet.create({})