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
import { airlinesItems } from '../../types/travelSearchDataTypes';
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

export const _keyExtractor = (item: travelSearchItemsType, index: number) => `${item.id}${index}`;
export const ITEM_HEIGHT = 78;
const _getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
});

const SORT_BY_PRICE_ITEMS = [
    {
        key: false,
        value: "Low to high",
    },
    {
        key: false,
        value: "High to low",
    }
]

const SearchResults = (props: Props) => {

    const dispatch = useDispatch();
    const { source, destination } = props.route.params || {};
    const searchResults = useSelector(searchResultsSelector);
    const [filteredData, setFilteredData] = useState<Array<travelSearchItemsType>>([])
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);
    //@ts-ignore
    const [flightDetails, setFlightDetails] = useState<ITEM>(null)
    const [checkSortByPrice, setCheckSortByPrice] = useState<boolean>(false);
    const [sortByPriceData, setSortByPriceData] = useState(SORT_BY_PRICE_ITEMS);
    const [filterListByAirlines, setFilterListByAirlines] = useState<Array<airlinesItems>>([]);
    const [filteredArrayByAirlines, setFilteredArrayByAirlines] = useState<Array<travelSearchItemsType>>([])

    useEffect(() => {
        const filterBySourceDestination = searchResults.filter(filterLogic);
        //Written this line of code for testing of Filters
        setFilteredData([...filterBySourceDestination, ...searchResults.slice(25)])
        generateFilterList()
    }, [source, destination, searchResults])

    const generateFilterList = () => {
        const airlines = searchResults.flatMap((flight: travelSearchItemsType) => flight.displayData.airlines);
        const uniqueAirlines: Array<airlinesItems> = [];

        airlines.forEach((airline: airlinesItems) => {
            const isUnique = !uniqueAirlines.some(
                (uniqueAirline) =>
                    uniqueAirline.airlineCode === airline.airlineCode
            );

            if (isUnique) {
                uniqueAirlines.push(Object.assign(airline, { isChecked: false }));
            }
        });

        setFilterListByAirlines(uniqueAirlines);
    }

    const filterLogic = (flightItem: travelSearchItemsType) => {
        const flightSource = flightItem?.displayData?.source?.airport;
        const flightDestination = flightItem?.displayData?.destination?.airport;
        if (flightSource?.airportCode === source?.airportCode && flightDestination?.airportCode === destination?.airportCode) {
            return true
        } else {
            return false;
        }
    }

    const onPressSortByRadio = (id = 0) => {
        const tempData = [...sortByPriceData];
        for (let index = 0; index < tempData.length; index++) {
            if (id === index) {
                tempData[index].key = true;
            } else {
                tempData[index].key = false;
            }
        }
        sortLogicByPrice(id)
        setSortByPriceData(tempData);
        handleShowModal();
    }

    const sortLogicByPrice = (id: number) => {
        let tempFilteredData = [...filteredData]
        tempFilteredData = tempFilteredData.sort((a, b) => {
            if (id === 0)
                return a.fare - b.fare
            else return b.fare - a.fare
        });
        setFilteredData(tempFilteredData)
    }

    const onPressCheckBoxItem = (newVal: boolean, indexNumber: number) => {
        const tempFilterListByAirlines = [...filterListByAirlines];
        //@ts-ignore
        tempFilterListByAirlines[indexNumber]["isChecked"] = newVal;
        setFilterListByAirlines(tempFilterListByAirlines);
        finalMethodForFilterByAirlines(false);
    }

    const finalMethodForFilterByAirlines = (modalCheck = false) => {
        const myTempArr = filterListByAirlines.filter((item: any) => item?.isChecked);
        const filteredArray = filteredData.filter(item => {
            const airlines = item.displayData.airlines;
            for (let i = 0; i < airlines.length; i++) {
                const airline = airlines[i];
                const matchingFlightItem = myTempArr.find(flightItem =>
                    flightItem.airlineCode === airline.airlineCode &&
                    flightItem.airlineName === airline.airlineName &&
                    flightItem.flightNumber === airline.flightNumber
                );
                if (matchingFlightItem) {
                    return true;
                }
            }
            return false;
        });
        myTempArr.length !== 0 ? setFilteredArrayByAirlines([...filteredArray]) : setFilteredArrayByAirlines([]);
        modalCheck && handleShowModal();
    }

    const onBackPress = () => {
        props?.navigation && props.navigation.goBack()
    }

    const onItemPressed = ({ item, index }: ITEM) => {
        setFlightDetails({ item, index });
        setShowFlightDetails(true);
    }

    const closeFlightDetailModal = () => {
        setShowFlightDetails(false);
         //@ts-ignore
        setFlightDetails(null)
    }

    const handleShowModal = () => {
        setShowFilter(false);
        setCheckSortByPrice(false);
    }

    const onPressSortByPrice = () => {
        setCheckSortByPrice(true);
        setShowFilter(true);
    }

    const cardItems: ListRenderItem<travelSearchItemsType> = useCallback(({ item, index }) => {
        return (
            <FlightCard onItemPressed={onItemPressed} item={item} index={index} />
        )
    }, [])

    const renderTopHeader = useCallback(() => <ListHeader listCount={filteredArrayByAirlines.length !== 0 ? filteredArrayByAirlines.length : filteredData.length} />, [filteredData, filteredArrayByAirlines])

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
                    <TouchableOpacity onPress={() => setShowFilter(true)} style={styles.filterContainer}>
                        <FilterIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={filteredArrayByAirlines.length !== 0 ? filteredArrayByAirlines : filteredData}
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
                navigation = {props.navigation}
            />
            <FilterFlightModal
                handleShowModal={handleShowModal}
                showModal={showFilter}
                checkSortByPrice={checkSortByPrice}
                sortData={sortByPriceData}
                onPressRadio={onPressSortByRadio}
                filterListByAirlines={filterListByAirlines}
                onPressCheckBoxItem={onPressCheckBoxItem}
                finalMethodForFilterByAirlines={finalMethodForFilterByAirlines}
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