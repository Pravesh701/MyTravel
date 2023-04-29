import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { memo, useCallback, useState, useEffect, useRef, MutableRefObject } from 'react'

//Custom Imports
import color from '../../constants/color';
import SearchBar from '../../components/SearchBar';
import fontFamily from '../../constants/fontFamily';
import FilterIcon from '../../assets/svgs/FilterIcon';
import { searchResultsSelector } from '../../selectors/travel.selector';
import { getSearchApi, updateSearchData } from "../../actions/travel.action";
import { HomeScreenNavigationProp, HomeScreenRouteProp } from '../../navigation/types';

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp
}

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("")
  const searchRef = useRef() as MutableRefObject<TextInput>;
  const searchResults = useSelector(searchResultsSelector);


  const searchFlight = useCallback((searchKey = "") => {
    setSearch(searchKey)
    if (searchKey.length > 2) {
      getSearchData(searchKey);
    } else if (Array.isArray(searchResults) && searchResults.length !== 0) {
      dispatch(updateSearchData([]))
    }
  }, [])

  const onPressRightIcon = useCallback(() => {
    searchRef.current.clear();
    setSearch("");
  }, [])

  const getSearchData = (searchTerm: string = "") => {
    dispatch(getSearchApi(searchTerm));
  }

  const onPressSearch = () => {
    props?.navigation && props.navigation.navigate("ExploreJourney");
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image resizeMode={"contain"} style={styles.logoStyle} source={require("../../assets/images/log.png")} />
        <Text style={styles.title}>{"Explore"}</Text>
        <Image resizeMode={"contain"} style={styles.logoStyle} source={{ uri: "https://img.icons8.com/fluency/48/null/lifecycle.png" }} />
      </View>
      <Text style={styles.description}>{"Where is your next destination?"}</Text>
      <View style={styles.mainSearch}>
        <TouchableOpacity activeOpacity={0.8} style={styles.searchContainer} onPress={onPressSearch}>
          <SearchBar
            ref={searchRef}
            placeholder={"Your Destination"}
            query={search}
            handleQueryChange={searchFlight}
            shouldShowIcon={true}
            clearSearch={true}
            onPressRightIcon={onPressRightIcon}
            disabled={false}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterContainer}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingHorizontal: 16
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
    marginTop: 10,
    color: color.darkBlue,
    fontFamily: fontFamily.bold,
    fontSize: 26
  },
  mainSearch: {
    flexDirection: "row",
    marginTop: 10,
  },
  searchContainer: {
    flex: 1,
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
})