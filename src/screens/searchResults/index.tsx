import React, { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, ListRenderItem } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import ListHeader from './components/ListHeader';
import FlightCard from './components/FlightCard';
import BackArrow from '../../assets/svgs/BackArrow';
import fontFamily from '../../constants/fontFamily';
import FilterIcon from '../../assets/svgs/FilterIcon';
import { searchResultsSelector } from '../../selectors/travel.selector';
import { RootNavigationProp, TopRouteProp } from '../../navigation/types';
import { travelSearchItemsType } from '../../types/travelSearchDataTypes';

type Props = {
    route: TopRouteProp;
    navigation: RootNavigationProp;
}

const _keyExtractor = (item: travelSearchItemsType, index: number) => item.id;

const SearchResults = (props: Props) => {

    const dispatch = useDispatch();
    const searchResults = useSelector(searchResultsSelector);

    const onBackPress = () => {
        props?.navigation && props.navigation.goBack()
    }

    const cardItems: ListRenderItem<travelSearchItemsType> = useCallback(({ item, index }) => {
        return (
            <FlightCard item={item} index={index} />
        )
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onBackPress} style={styles.backButtonContainer}>
                    <BackArrow fill={color.mediumBlack} />
                </TouchableOpacity>
                <Text style={styles.title}>{"Explore"}</Text>
                <TouchableOpacity style={styles.filterContainer}>
                    <FilterIcon />
                </TouchableOpacity>
            </View>
            <FlatList
                data={searchResults}
                keyExtractor={_keyExtractor}
                renderItem={cardItems}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeader}
                contentContainerStyle={styles.contentContainer}
                style={styles.listContainer}
            />
        </SafeAreaView>
    )
}

export default memo(SearchResults);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: color.white,
    },
    listContainer: {
        flex: 1,
        marginTop: 10
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 16
    },
    headerContainer: {
        height: 56,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16
    },
    backButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E4E4E4",
        borderRadius: 20,
    },
    filterContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: color.primary,
        justifyContent: "center",
        alignItems: "center",
        marginStart: 23
    },
    title: {
        color: color.mediumBlack,
        fontFamily: fontFamily.medium,
        fontSize: 16,
    },
    cardContainer: {

    },
})