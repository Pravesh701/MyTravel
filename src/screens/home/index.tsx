import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Pressable } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import fontFamily from '../../constants/fontFamily';
import FilterIcon from '../../assets/svgs/FilterIcon';
import { searchResultsSelector } from '../../selectors/travel.selector';
import { getSearchApi } from "../../actions/travel.action";
import { RootNavigationProp, HomeScreenRouteProp } from '../../navigation/types';

type Props = {
  navigation: RootNavigationProp;
  route: HomeScreenRouteProp
}

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const searchResults = useSelector(searchResultsSelector);

  useEffect(() => {
    getSearchData();
  }, [])

  const getSearchData = (searchTerm: string = "") => {
    dispatch(getSearchApi(searchTerm));
  }

  const onPressSearch = () => {
    props?.navigation && props.navigation.navigate("ExploreJourney");
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image resizeMode={"contain"} style={styles.logoStyle} source={require("../../assets/images/log.png")} />
          <Text style={styles.title}>{"Explore"}</Text>
          <Image resizeMode={"contain"} style={styles.logoStyle} source={{ uri: "https://img.icons8.com/fluency/48/null/lifecycle.png" }} />
        </View>
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
      </View>
    </SafeAreaView>
  )
}

export default memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingHorizontal: 16
  },
  safeAreaView: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: color.white,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
    fontSize: 26
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
})