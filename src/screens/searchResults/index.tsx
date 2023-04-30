import React, { memo, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, ListRenderItem } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import ListHeader from './components/ListHeader';
import FlightCard from './components/FlightCard';
import BackArrow from '../../assets/svgs/BackArrow';
import fontFamily from '../../constants/fontFamily';
import FilterIcon from '../../assets/svgs/FilterIcon';
import FlightDetailModal from './components/FlightDetailModal';
import { searchResultsSelector } from '../../selectors/travel.selector';
import { RootNavigationProp, TopRouteProp } from '../../navigation/types';
import { travelSearchItemsType } from '../../types/travelSearchDataTypes';

type Props = {
    route: TopRouteProp;
    navigation: RootNavigationProp;
}
export type ITEM = {
    item: travelSearchItemsType;
    index: number
}

export const _keyExtractor = (item: travelSearchItemsType, index: number) => item.id;
export const ITEM_HEIGHT = 78;
const _getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
});

const SearchResults = (props: Props) => {

    const dispatch = useDispatch();
    const searchResults = useSelector(searchResultsSelector);
    const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);
    const [flightDetails, setFlightDetails] = useState<ITEM>(null)

    const onBackPress = () => {
        props?.navigation && props.navigation.goBack()
    }

    const onItemPressed = ({ item, index }: ITEM) => {
        setFlightDetails({ item, index });
        setShowFlightDetails(true);
    }

    const cardItems: ListRenderItem<travelSearchItemsType> = useCallback(({ item, index }) => {
        return (
            <FlightCard onItemPressed={onItemPressed} item={item} index={index} />
        )
    }, [])

    const closeFlightDetailModal = () => {
        setShowFlightDetails(false);
        setFlightDetails(null)
    }


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
                getItemLayout={_getItemLayout}
                windowSize={150}
                maxToRenderPerBatch={5}
                onEndReachedThreshold={0.5}
                removeClippedSubviews={true}
            />
            <FlightDetailModal
                showFlightDetails={showFlightDetails}
                closeFlightDetailModal={closeFlightDetailModal}
                flightDetails={flightDetails}
                booked={false}
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
})