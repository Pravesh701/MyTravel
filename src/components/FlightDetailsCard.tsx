import moment from 'moment'
import React, { memo } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

//Custom Imports
import color from '../constants/color'
import { Flight_ICON } from '../assets/urls'
import fontFamily from '../constants/fontFamily'
import { displayDataType } from '../types/travelSearchDataTypes'

type Props = {
    displayData: displayDataType | undefined;
}

const FlightDetailsCard = ({ displayData }: Props) => {
    console.log('flightDetails', displayData);
    const duration = moment.duration(moment(displayData?.destination.arrTime).diff(displayData?.source.depTime));
    const diffTime = `-- ${duration.hours()}h ${duration.minutes()}m --`
    return (
        <View style={styles.flightCard}>
            <View style={styles.flightContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        style={styles.flightIcon}
                        source={{ uri: Flight_ICON, cache: "force-cache" }}
                    />
                    <Text style={styles.flightName}>{displayData?.airlines[0].airlineName}</Text>
                    <Text style={styles.flightNumber}>{`${displayData?.airlines[0].airlineCode}-${displayData?.airlines[0].flightNumber}`}</Text>
                </View>
                <View style={styles.arrivalContainer}>
                    <Text style={styles.arrivalName}>{displayData?.source.airport.cityName}</Text>
                    <Text style={styles.depTime}>{moment(displayData?.source.depTime).format("hh:mm")}</Text>
                    <Text style={styles.dateText}>{moment(displayData?.source.depTime).format("ddd, Do MMMM")}</Text>
                    <Text style={styles.terminal}>{`(${displayData?.source.airport.terminal}) ${displayData?.source.airport.airportName}`}</Text>
                </View>
            </View>
            <View style={styles.depContainer}>
                <Text style={styles.arrivalName}>{displayData?.destination.airport.cityName}</Text>
                <View style={styles.hourCountContainer}>
                    <Text style={styles.hourCount}>{diffTime}</Text>
                    <Text style={styles.arrTime}>{moment(displayData?.destination.arrTime).format("hh:mm")}</Text>
                </View>
                <Text style={styles.dateText}>{moment(displayData?.destination.arrTime).format("ddd, Do MMMM")}</Text>
                <Text style={styles.destinationTerminal}>{`(${displayData?.destination.airport.terminal}) ${displayData?.destination.airport.airportName}`}</Text>
            </View>
        </View>
    )
}

export default memo(FlightDetailsCard);

const styles = StyleSheet.create({
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
})