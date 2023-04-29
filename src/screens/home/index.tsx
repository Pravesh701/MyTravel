import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Find your next trip"}</Text>
      <Text style={styles.description}>{"Nordic scenery"}</Text>
      <View style={styles.mainSearch}>
        <SearchBar
          ref={searchRef}
          placeholder={"Search..."}
          query={search}
          handleQueryChange={searchFlight}
          shouldShowIcon={true}
          clearSearch={true}
          onPressRightIcon={onPressRightIcon}
          customStyles={styles.searchContainer}
        />
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
  title: {
    marginTop: 81,
    color: color.gray,
    fontFamily: fontFamily.medium,
    fontSize: 16
  },
  description: {
    marginTop: 2,
    color: color.mediumBlack,
    fontFamily: fontFamily.medium,
    fontSize: 26
  },
  mainSearch: {
    flexDirection: "row",
    marginTop: 26,
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