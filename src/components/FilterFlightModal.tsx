import React from 'react'
import color from '../constants/color';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import CrossIcon from '../assets/svgs/CrossIcon';
import fontFamily from '../constants/fontFamily';

type Props = {
    showModal: boolean;
    handleShowModal: () => void;
    checkSortByPrice: boolean;
}

const FilterFlow = () => {
    return (
        <View>

        </View>
    )
}

const SortByPrice = () => {
    return (
        <View style = {styles.sortByPriceContainer}>
            <Text style = {styles.sortByPrice}>SORT BY PRICE</Text>
            <View style = {styles.lineStyle} />
            
        </View>
    )
}

const FilterFlightModal = ({
    showModal = false,
    handleShowModal = () => { },
    checkSortByPrice = false,
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
                    {checkSortByPrice ? <SortByPrice /> : <FilterFlow />}
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
    sortByPrice:{
        color: color.lightBlack,
        fontFamily: fontFamily.medium,
        fontSize: 16,
        marginHorizontal: 16
    },
    sortByPriceContainer:{
        // paddingHorizontal: 16
    },
    lineStyle:{
        height: 1,
        backgroundColor: color.silver,
        marginTop: 10
    }
})