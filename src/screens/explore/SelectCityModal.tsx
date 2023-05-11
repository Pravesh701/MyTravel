import { useSelector } from 'react-redux';
import React, { useCallback, memo, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, NativeSyntheticEvent, FlatList, ListRenderItem } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import { _keyExtractor } from '../searchResults';
import CrossIcon from '../../assets/svgs/CrossIcon';
import fontFamily from '../../constants/fontFamily';
import { searchResultsSelector } from '../../selectors/travel.selector';
import { airportType, travelSearchItemsType } from '../../types/travelSearchDataTypes';

type Props = {
    modalType: "source" | "destination" | "";
    closeModal: (event: NativeSyntheticEvent<any>) => void;
    onItemPressed: Function;
}

const ITEM_HEIGHT = 40;
const _getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
});

const SelectCityModal = ({ modalType = "", closeModal = () => { }, onItemPressed = () => { } }: Props) => {
    const itemType = modalType === "source";
    const searchResults = useSelector(searchResultsSelector);
    const [finalCityData, setFinalCityData] = useState<any>([])

    useEffect(() => {
        getUniqueAirports()
    }, [itemType])

    const getUniqueAirports = () => {
        const airportSet = new Set();
        const uniqueAirports: Array<airportType> = [];

        searchResults.forEach((flight: travelSearchItemsType) => {
            const sourceAirport = flight.displayData.source.airport;
            const destAirport = flight.displayData.destination.airport;

            if (!airportSet.has(sourceAirport.airportCode)) {
                airportSet.add(sourceAirport.airportCode);
                uniqueAirports.push(sourceAirport);
            }

            if (!airportSet.has(destAirport.airportCode)) {
                airportSet.add(destAirport.airportCode);
                uniqueAirports.push(destAirport);
            }
        });
        setFinalCityData(uniqueAirports)
    }


    const cardItems: ListRenderItem<airportType> = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => onItemPressed(item)}
                style={styles.listItemsContainer}>
                <View>
                    <Text style={styles.cityName}>{item.cityName}</Text>
                    <Text style={styles.stationName}>{item.airportName}</Text>
                </View>
                <Text style={styles.airportCode}>{item.airportCode}</Text>
            </TouchableOpacity>
        )
    }, [itemType, finalCityData, searchResults])

    const ItemSeparatorComponent = () => <View style={styles.separator} />;

    return (
        <Modal
            transparent
            visible={!!modalType}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
                        <CrossIcon
                            width={"15"}
                            height={"15"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.modalTypeStyle}>{`Select ${itemType ? "Departure" : "Destination"}`}</Text>
                    <FlatList
                        data={finalCityData}
                        keyExtractor={_keyExtractor}
                        //@ts-ignore
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
                        ItemSeparatorComponent={ItemSeparatorComponent}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default memo(SelectCityModal);

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: color.modalBackground,
        flexDirection: "column",
        justifyContent: "flex-end",
        flex: 1,
    },
    innerContainer: {
        flexDirection: "column",
        backgroundColor: color.white,
        height: "50%",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    contentContainerStyle: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexGrow: 1,
    },
    closeModal: {
        alignSelf: "flex-end",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
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
    modalTypeStyle: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: color.mediumBlack,
        marginHorizontal: 16
    },
    listItemsContainer: {
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: ITEM_HEIGHT
    },
    cityName: {

    },
    stationName: {

    },
    airportCode: {

    },
    separator: {
        height: 1,
        backgroundColor: color.silver
    }
})