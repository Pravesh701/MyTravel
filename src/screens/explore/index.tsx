import React, { memo, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import SelectCityModal from './SelectCityModal';
import BackArrow from '../../assets/svgs/BackArrow';
import fontFamily from '../../constants/fontFamily';
import showSnackbar from '../../components/Snackbar';
import CalendarView from '../../components/CalendarView';
import { airportType } from '../../types/travelSearchDataTypes';
import { RootNavigationProp, TopRouteProp } from '../../navigation/types';

type Props = {
    route: TopRouteProp;
    navigation: RootNavigationProp;
}

const ExploreJourney = (props: Props) => {

    const [source, setSource] = useState<airportType>({
        cityCode: "DEL",
        cityName: "Delhi",
        terminal: "3",
        airportCode: "DEL",
        airportName: "Indira Gandhi Airport",
        countryCode: "IN",
        countryName: "India"
    });
    const [destination, setDestination] = useState<airportType>({
        cityCode: "BOM",
        cityName: "Mumbai",
        terminal: "2",
        airportCode: "BOM",
        airportName: "Mumbai",
        countryCode: "IN",
        countryName: "India"
    });
    const [arrival, setArrival] = useState<string>("Arrival");
    const [departureTime, setDepartureTime] = useState<string>("Departure");
    const [modalType, setModalType] = useState<"source" | "destination" | "">("")

    const onBackPress = () => {
        props?.navigation && props.navigation.goBack()
    }
    const closeModal = () => {
        setModalType("")
    }

    const onItemPressed = (item: airportType) => {
        if (modalType === "source") {
            setSource(item);
        } else {
            setDestination(item);
        }
        closeModal();
    }

    const onSearch = () => {
        if (source.airportCode === destination.airportCode) {
            showSnackbar("Destination and departure station can't be same!");
        } else if (arrival === "Arrival" || departureTime === "Departure") {
            showSnackbar("Please select trip date.");
        } else if (arrival === departureTime) {
            showSnackbar("Arrival and departure date can't be same!");
        } else {
            props?.navigation && props.navigation.navigate("SearchResults", { source, destination })
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView
                style={styles.container}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={onBackPress} style={styles.backButtonContainer}>
                        <BackArrow fill={color.mediumBlack} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{"Explore"}</Text>
                </View>
                <Text style={styles.searchFlight}>{"Select flights"}</Text>
                <View style={styles.searchContainer}>
                    <TouchableOpacity onPress={() => setModalType("source")} activeOpacity={0.8} style={styles.sourceContainer}>
                        <Text style={styles.fromText}>{"From"}</Text>
                        <Text style={styles.stationCode}>{source.airportCode}</Text>
                        <Text style={styles.stationName}>{source.cityName}</Text>
                        <View style={styles.lineStyle} />
                    </TouchableOpacity>
                    <Image
                        resizeMode={"contain"}
                        source={{ uri: "https://img.icons8.com/windows/32/null/outgoing-data.png" }}
                        style={styles.outgoingIcon}
                    />
                    <TouchableOpacity onPress={() => setModalType("destination")} activeOpacity={0.8} style={[styles.sourceContainer, { alignItems: "flex-end" }]} >
                        <Text style={styles.fromText}>{"To"}</Text>
                        <Text style={styles.stationCode}>{destination.airportCode}</Text>
                        <Text style={styles.stationName}>{destination.cityName}</Text>
                        <View style={styles.lineStyle} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.tripDate}>{"Trip Date"}</Text>
                <View style={styles.tripDateContainer}>
                    <CalendarView
                        placeHolder={departureTime}
                        onDayPress={({ dateString }) => setDepartureTime(dateString)}
                    />
                    <CalendarView
                        placeHolder={arrival}
                        onDayPress={({ dateString }) => setArrival(dateString)}
                    />
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
                    <Text style={styles.searchText}>
                        {"Search Flight"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <SelectCityModal
                closeModal={closeModal}
                modalType={modalType}
                onItemPressed={onItemPressed}
            />
        </SafeAreaView>
    )
}

export default memo(ExploreJourney);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    contentContainer: {
        paddingHorizontal: 16,
        flexGrow: 1
    },
    headerContainer: {
        height: 56,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    backButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E4E4E4",
        borderRadius: 20,
        position: "absolute",
        start: 0,
        zIndex: 100
    },
    title: {
        color: color.mediumBlack,
        fontFamily: fontFamily.medium,
        fontSize: 16,
    },
    searchFlight: {
        color: color.darkBlue,
        fontFamily: fontFamily.bold,
        fontSize: 22,
        marginTop: 10
    },
    sourceInputStyle: {
        marginTop: 20
    },
    destinationInputStyle: {
        marginTop: 20
    },
    tripDate: {
        color: color.gray,
        fontFamily: fontFamily.medium,
        fontSize: 16,
        marginTop: 20
    },
    tripDateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    searchButton: {
        height: 44,
        borderRadius: 20,
        backgroundColor: color.primary,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
    },
    searchText: {
        color: color.white,
        fontFamily: fontFamily.bold,
        fontSize: 16,
    },
    searchContainer: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    sourceContainer: {
        width: "45%"
    },
    fromText: {
        color: color.lightBlack,
        fontFamily: fontFamily.light,
        fontSize: 12,
    },
    stationCode: {
        color: color.mediumBlack,
        fontFamily: fontFamily.medium,
        fontSize: 32,
        marginTop: 4
    },
    stationName: {
        color: color.mediumBlack,
        fontFamily: fontFamily.light,
        fontSize: 12,
        marginTop: 4
    },
    lineStyle: {
        backgroundColor: color.inActive,
        height: 1,
        marginTop: 10,
        width: "100%"
    },
    outgoingIcon: {
        width: 30,
        height: 20
    }
})