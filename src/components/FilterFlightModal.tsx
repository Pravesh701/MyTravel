import React from 'react'
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList } from 'react-native'

//Custom Imports
import Radio from './Radio';
import color from '../constants/color';
import CrossIcon from '../assets/svgs/CrossIcon';
import fontFamily from '../constants/fontFamily';
import { airlinesItems } from '../types/travelSearchDataTypes';

type Props = {
    showModal: boolean;
    handleShowModal: () => void;
    checkSortByPrice: boolean;
    onPressRadio: Function;
    sortData: Array<any>;
    filterListByAirlines: Array<airlinesItems>;
    onPressCheckBoxItem: Function;
    finalMethodForFilterByAirlines: Function;
}

const FilterFlow = ({
    filterListByAirlines = [],
    onPressCheckBoxItem = (check: boolean, id: number) => { },
    finalMethodForFilterByAirlines = () => { }
}: any) => {

    const renderItems = ({ item, index }: any) => {
        return (
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    disabled={false}
                    value={item?.isChecked}
                    tintColors={{ true: color.primary, false: color.lightBlack }}
                    tintColor={color.lightBlack}
                    onValueChange={(newValue) => onPressCheckBoxItem(newValue, index)}
                />
                <Text style={[styles.airlineName, {
                    color: item?.isChecked ? color.primary : color.lightBlack
                }]}>{item?.airlineName}</Text>
            </View>
        )
    }

    const renderListHeader = () => {
        return (
            <Text style={styles.filterByAirLineText}>Filter by Airlines</Text>
        )
    }

    return (
        <React.Fragment>
            <FlatList
                data={filterListByAirlines}
                keyExtractor={(item: airlinesItems) => item.airlineCode}
                renderItem={renderItems}
                contentContainerStyle={styles.listContainer}
                style={styles.checkBoxList}
                ListHeaderComponent={renderListHeader}
            />
            <TouchableOpacity onPress={() => finalMethodForFilterByAirlines(true)} style={styles.bottomButtonContainer}>
                <Text style={styles.bottomButtonText}>Apply Filter</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

const SortByPrice = ({ onPressRadio = () => { }, data = [] }: any) => {
    const renderRadioItems = ({ key, value }: any, index: number) => {
        return (
            <TouchableOpacity key={`${value}${index}`} onPress={() => onPressRadio(index)} style={styles.radioContainer}>
                <Radio
                    active={key}
                />
                <Text style={styles.radioText}>{value}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.sortByPriceContainer}>
            <Text style={styles.sortByPrice}>SORT BY PRICE</Text>
            <View style={styles.lineStyle} />
            {data.map(renderRadioItems)}
        </View>
    )
}

const FilterFlightModal = ({
    showModal = false,
    handleShowModal = () => { },
    checkSortByPrice = false,
    onPressRadio = () => { },
    sortData = [],
    filterListByAirlines = [],
    onPressCheckBoxItem = () => { },
    finalMethodForFilterByAirlines = () => { },
}: Props) => {
    return (
        <Modal
            transparent
            visible={showModal}
            onRequestClose={handleShowModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={handleShowModal} style={styles.closeCalendar}>
                        <CrossIcon
                            width={"15"}
                            height={"15"}
                        />
                    </TouchableOpacity>
                    {checkSortByPrice ?
                        <SortByPrice
                            onPressRadio={onPressRadio}
                            data={sortData}
                        />
                        :
                        <FilterFlow
                            filterListByAirlines={filterListByAirlines}
                            onPressCheckBoxItem={onPressCheckBoxItem}
                            finalMethodForFilterByAirlines={finalMethodForFilterByAirlines}
                        />}
                </View>
            </View>
        </Modal>
    )
}

export default FilterFlightModal

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
        height: "75%",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    closeCalendar: {
        alignSelf: "flex-end",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    sortByPrice: {
        color: color.lightBlack,
        fontFamily: fontFamily.medium,
        fontSize: 16,
        marginHorizontal: 16
    },
    sortByPriceContainer: {
        // paddingHorizontal: 16
    },
    lineStyle: {
        height: 1,
        backgroundColor: color.silver,
        marginTop: 10
    },
    radioContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: 16,
        alignItems: "center"
    },
    radioText: {
        fontFamily: fontFamily.regular,
        color: color.mediumBlack,
        fontSize: 16,
        marginStart: 12
    },
    checkBoxContainer: {
        marginTop: 16,
        alignItems: "center",
        flexDirection: "row"
    },
    listContainer: {
        flexGrow: 1,
        paddingHorizontal: 16
    },
    checkBoxList: {
        flex: 1
    },
    filterByAirLineText: {
        color: color.lightBlack,
        fontFamily: fontFamily.medium,
        fontSize: 16,
    },
    airlineName: {
        color: color.mediumBlack,
        fontFamily: fontFamily.regular,
        fontSize: 16,
        marginStart: 10
    },
    bottomButtonContainer: {
        backgroundColor: color.primary,
        height: 44,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomButtonText: {
        color: color.white,
        fontFamily: fontFamily.bold,
        fontSize: 16,
    }
})