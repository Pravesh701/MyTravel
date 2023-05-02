import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'

//Custom Imports
import color from '../../../constants/color';
import { Flight_ICON } from '../../../assets/urls';
import fontFamily from '../../../constants/fontFamily';
import { ITEM_HEIGHT } from '../../../screens/searchResults/index';
import { travelSearchItemsType } from '../../../types/travelSearchDataTypes';

type Props = {
  item: travelSearchItemsType;
  index: number;
  onItemPressed: Function;
}

const FlightCard = ({ item, index, onItemPressed = () => { } }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onItemPressed({ item, index })} style={styles.cardContainer}>
      <View style={styles.flightIconContainer}>
        <Image
          style={styles.flightIcon}
          source={{ uri: Flight_ICON, cache: "force-cache" }}
        />
        <Text style={styles.flightName}>{item.displayData.airlines[0].airlineName}</Text>
      </View>
      <View style={styles.airlineTimeContainer}>
        <Text style={styles.airlineTime}>{"05:00 - 18:50"}</Text>
        <Text style={styles.airlineStop}>{"2h 10m Non-Stop"}</Text>
      </View>
      <Text style={styles.price}>{"$4,531"}</Text>
    </TouchableOpacity>
  )
}

export default memo(FlightCard);

const styles = StyleSheet.create({
  cardContainer: {
    height: ITEM_HEIGHT,
    marginTop: 12,
    borderRadius: 10,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 4,
    shadowColor: "rgba(0,0,0,0.7)",
    backgroundColor: color.white,
    flexDirection: "row",
  },
  flightIcon: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  flightIconContainer: {

  },
  flightName: {
    color: color.mediumBlack,
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },
  airlineTimeContainer: {
    marginStart: 20,
  },
  airlineTime: {
    color: color.mediumBlack,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  airlineStop: {
    color: color.lightBlack,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginTop: 12
  },
  price: {
    color: color.mediumBlack,
    fontFamily: fontFamily.medium,
    fontSize: 18,
    position: "absolute",
    top: 12,
    end: 12,
  }
})