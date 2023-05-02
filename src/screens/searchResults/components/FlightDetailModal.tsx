import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native'

//Custom Imports
import { ITEM } from "../index";
import color from '../../../constants/color';
import CrossIcon from '../../../assets/svgs/CrossIcon'
import fontFamily from '../../../constants/fontFamily';
import showSnackbar from '../../../components/Snackbar';
import { RootNavigationProp } from '../../../navigation/types';
import { createTrip, tripNotCreated } from '../../../services/api';
import FlightDetailsCard from '../../../components/FlightDetailsCard';

type Props = {
    showFlightDetails: boolean;
    closeFlightDetailModal: any;
    flightDetails: ITEM;
    booked?: boolean;
    navigation?: RootNavigationProp
}

const FlightDetailModal = ({ showFlightDetails = false, closeFlightDetailModal = () => { }, flightDetails, booked = false, navigation }: Props) => {
    const { id = "", fare = 0 } = flightDetails?.item || {};
    const bookFlight = async () => {
        try {
            if (booked) {
                const { data } = await tripNotCreated({ id })
                if (!!data) {
                    closeFlightDetailModal();
                    showSnackbar("Trip cancelled successfully");
                }
            } else {
                const { data } = await createTrip({ id })
                if (!!data) {
                    closeFlightDetailModal();
                    showSnackbar("Trip created successfully");
                    navigation && navigation?.navigate("BottomTabs");
                }
            }
        } catch (error) {
            closeFlightDetailModal();
            showSnackbar("Trip cannot be created successfully");
        }
    }

    return (
        <Modal
            transparent
            visible={showFlightDetails}
            onRequestClose={closeFlightDetailModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}>
                        <TouchableOpacity onPress={closeFlightDetailModal} style={styles.closeCalendar}>
                            <CrossIcon
                                width={"15"}
                                height={"15"}
                            />
                        </TouchableOpacity>
                        <FlightDetailsCard key={id} item={flightDetails?.item} />
                    </ScrollView>
                    <View style={styles.footer}>
                        <View>
                            <Text style={styles.fareText}>{"Fare"}</Text>
                            <Text style={styles.rupeeText}>{`₹${fare}`}</Text>
                        </View>
                        <TouchableOpacity onPress={bookFlight} style={styles.proceedButton}>
                            <Text style={styles.proceedText}>{booked ? "Cancel Ticket" : "Proceed"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default FlightDetailModal

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
    closeCalendar: {
        alignSelf: "flex-end",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    flightCard: {
        marginTop: 10,
        borderRadius: 10,
        padding: 16,
        backgroundColor: color.white,
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: color.inActive,
        justifyContent: "space-between"
    },
    flightContainer: {
        flexDirection: "row"
    },
    iconContainer: {

    },
    flightIcon: {
        width: 40,
        height: 40,
    },
    flightName: {
        color: color.lightBlack,
        fontFamily: fontFamily.light,
        fontSize: 11,
        marginTop: 6
    },
    flightNumber: {
        color: color.lightBlack,
        fontFamily: fontFamily.light,
        fontSize: 11,
        marginTop: 2,
    },
    arrivalContainer: {
        marginStart: 8
    },
    arrivalName: {
        color: color.mediumBlack,
        fontFamily: fontFamily.regular,
        fontSize: 11,
    },
    depTime: {
        color: color.mediumBlack,
        fontFamily: fontFamily.bold,
        fontSize: 14,
        marginTop: 4
    },
    dateText: {
        color: color.mediumBlack,
        fontFamily: fontFamily.light,
        fontSize: 12,
        marginTop: 6,
    },
    terminal: {
        color: color.lightBlack,
        fontFamily: fontFamily.light,
        fontSize: 12,
        marginTop: 2,
        width: 90
    },
    hourCountContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4
    },
    hourCount: {
        color: color.mediumBlack,
        fontFamily: fontFamily.regular,
        fontSize: 14,
        marginEnd: "22%"
    },
    arrTime: {
        color: color.mediumBlack,
        fontFamily: fontFamily.bold,
        fontSize: 14,
    },
    depContainer: {
        alignItems: "flex-end",
    },
    destinationTerminal: {
        color: color.lightBlack,
        fontFamily: fontFamily.light,
        fontSize: 12,
        marginTop: 2,
        width: 90,
        textAlign: "right"
    },
    footer: {
        height: 80,
        backgroundColor: color.white,
        borderTopWidth: 1,
        borderColor: color.inActive,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    fareText: {
        color: color.lightBlack,
        fontFamily: fontFamily.regular,
        fontSize: 12,
    },
    rupeeText: {
        color: color.mediumBlack,
        fontFamily: fontFamily.bold,
        fontSize: 18,
        marginTop: 2
    },
    proceedButton: {
        height: 44,
        borderRadius: 10,
        backgroundColor: color.primary,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    proceedText: {
        color: color.white,
        fontFamily: fontFamily.bold,
        fontSize: 16,
    }
})