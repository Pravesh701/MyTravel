import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useEffect, useCallback, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Pressable, FlatList, ListRenderItem } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import fontFamily from '../../constants/fontFamily';
import FilterIcon from '../../assets/svgs/FilterIcon';
import { getSearchApi } from "../../actions/travel.action";
import FlightDetailsCard from '../../components/FlightDetailsCard';
import { ITEM, _getItemLayout, _keyExtractor } from '../searchResults';
import { searchResultsSelector } from '../../selectors/travel.selector';
import { travelSearchItemsType } from '../../types/travelSearchDataTypes';
import FlightDetailModal from '../searchResults/components/FlightDetailModal';
import { RootNavigationProp, HomeScreenRouteProp } from '../../navigation/types';

type Props = {
  navigation: RootNavigationProp;
  route: HomeScreenRouteProp;
}

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const searchResults = useSelector(searchResultsSelector);
  const [flightDetails, setFlightDetails] = useState<ITEM | null>(null)
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Array<travelSearchItemsType>>([])

  useEffect(() => {
    getSearchData();
  }, [])

  const getSearchData = (searchTerm: string = "") => {
    dispatch(getSearchApi(searchTerm));
  }

  const onPressSearch = () => {
    props?.navigation && props.navigation.navigate("ExploreJourney");
  }

  const onItemPressed = ({ item, index }: ITEM) => {
    setFlightDetails({ item, index });
    setShowFlightDetails(true);
  }

  const closeFlightDetailModal = () => {
    setShowFlightDetails(false);
    setFlightDetails(null)
  }

  const cardItems: ListRenderItem<travelSearchItemsType> = useCallback(({ item, index }) => {
    return (
      <FlightDetailsCard
        containerStyle={styles.flightDetailsCard}
        key={item.id}
        item={item}
        onItemPressed={onItemPressed}
        index={index}
      />
    )
  }, [])

  const ListHeader = memo(() => (
    <React.Fragment>
      <Text style={styles.description}>{"Where is your next destination?"}</Text>
      <View style={styles.mainSearch}>
        <Pressable style={styles.searchContainer} onPress={onPressSearch}>
          <View style={styles.searchIconContainer}>
            <Image resizeMode={"contain"} style={styles.locationIcon} source={{ uri: "https://img.icons8.com/ios/50/null/marker--v2.png" }} />
          </View>
          <Text style={styles.searchInput}>{"Your Destination"}</Text>
        </Pressable>
        <TouchableOpacity style={styles.filterContainer}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.upcomingBooking}>{"Upcoming Bookings"}</Text>
    </React.Fragment>
  ))

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image resizeMode={"contain"} style={styles.logoStyle} source={require("../../assets/images/log.png")} />
          <Text style={styles.title}>{"Explore"}</Text>
          <Image resizeMode={"contain"} style={styles.logoStyle} source={{ uri: "https://img.icons8.com/fluency/48/null/lifecycle.png" }} />
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={_keyExtractor}
          renderItem={cardItems}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.listContainer}
          getItemLayout={_getItemLayout}
          windowSize={150}
          maxToRenderPerBatch={5}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          ListHeaderComponent={ListHeader}
        />
      </View>
      <FlightDetailModal
        showFlightDetails={showFlightDetails}
        closeFlightDetailModal={closeFlightDetailModal}
        flightDetails={flightDetails}
        booked={true}
      />
    </SafeAreaView>
  )
}

export default memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  safeAreaView: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: color.white,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  logoStyle: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  title: {
    color: color.mediumBlack,
    fontFamily: fontFamily.medium,
    fontSize: 16
  },
  description: {
    marginTop: 16,
    color: color.darkBlue,
    fontFamily: fontFamily.bold,
    fontSize: 26,
  },
  mainSearch: {
    flexDirection: "row",
    marginTop: 16,
  },
  searchContainer: {
    height: 44,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  filterContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
    marginStart: 23
  },
  locationIcon: {
    width: 24,
    height: 24
  },
  searchIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 10,
    width: 18,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 24,
    color: color.modalBackground,
    flex: 1,
    fontFamily: fontFamily.regular
  },
  upcomingBooking: {
    color: color.mediumBlack,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    marginTop: 20,
  },
  listContainer: {
    flex: 1,
    marginTop: 10
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16
  },
  flightDetailsCard: {
    marginTop: 15
  }
})