import { useSelector, useDispatch } from 'react-redux';
import React, { memo, useCallback, useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, ListRenderItem } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import ListHeader from './components/ListHeader';
import FlightCard from './components/FlightCard';
import BackArrow from '../../assets/svgs/BackArrow';
import fontFamily from '../../constants/fontFamily';
import FilterIcon from '../../assets/svgs/FilterIcon';
import FlightDetailModal from './components/FlightDetailModal';
import FilterFlightModal from '../../components/FilterFlightModal';
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

    const { source, destination } = props.route.params || {};
    const dispatch = useDispatch();
    const searchResults = useSelector(searchResultsSelector);
    const [filteredData, setFilteredData] = useState<Array<travelSearchItemsType>>([])
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);
    const [flightDetails, setFlightDetails] = useState<ITEM>(null)
    const [checkSortByPrice, setCheckSortByPrice] = useState<boolean>(false)

    useEffect(() => {
        setFilteredData(() => searchResults.filter(filterLogic))
    }, [source, destination, searchResults])

    const filterLogic = (flightItem: travelSearchItemsType) => {
        const flightSource = flightItem?.displayData?.source?.airport;
        const flightDestination = flightItem?.displayData?.destination?.airport;
        if (flightSource?.airportCode === source?.airportCode && flightDestination?.airportCode === destination?.airportCode) {
            return true
        } else {
            return false;
        }
    }

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

    const handleShowModal = () => {
        setShowFilter(false);
    }

    const onPressSortByPrice=()=>{
        setCheckSortByPrice(true);
        setShowFilter(true);
    }

    const renderTopHeader = useCallback(() => <ListHeader listCount={filteredData.length} />, [filteredData])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={onBackPress} style={styles.backButtonContainer}>
                        <BackArrow fill={color.mediumBlack} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{`${source?.cityName}  ->  ${destination?.cityName}`}</Text>
                </View>
                <View style={styles.sortByPriceContainer}>
                    <TouchableOpacity onPress={onPressSortByPrice} style={styles.sortByContainer}>
                        <Text style={styles.sortByPrice}>{"Price"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setShowFilter(true)} style={styles.filterContainer}>
                        <FilterIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={_keyExtractor}
                renderItem={cardItems}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderTopHeader}
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
            <FilterFlightModal
                handleShowModal={handleShowModal}
                showModal={showFilter}
                checkSortByPrice = {checkSortByPrice}
            />
        </SafeAreaView>
    )
}

export default memo(SearchResults);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
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
        marginStart: 10
    },
    title: {
        color: color.mediumBlack,
        fontFamily: fontFamily.medium,
        fontSize: 16,
        marginStart: 15
    },
    footer: {
        height: 100,
        backgroundColor: color.modalBackground,
    },
    sortByPriceContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    sortByContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: color.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    sortByPrice: {
        color: color.white,
        fontFamily: fontFamily.medium,
        fontSize: 16,
    }
})