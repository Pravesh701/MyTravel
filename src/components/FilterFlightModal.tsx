import React from 'react'
import color from '../constants/color';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import CrossIcon from '../assets/svgs/CrossIcon';
import fontFamily from '../constants/fontFamily';
import Radio from './Radio';

type Props = {
    showModal: boolean;
    handleShowModal: () => void;
    checkSortByPrice: boolean;
    onPressRadio: Function;
    sortData: Array<any>;
}

const FilterFlow = () => {
    return (
        <View>

        </View>
    )
}

const SortByPrice = ({ onPressRadio = () => { }, data = [] }: any) => {
    const renderRadioItems = ({ key, value }: any, index: number) => {
        return (
            <TouchableOpacity onPress={() => onPressRadio(index)} style={styles.radioContainer}>
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
    sortData = []
}: Props) => {
    console.log('checkSortByPrice', checkSortByPrice);

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
                        <FilterFlow />}
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
    }
})