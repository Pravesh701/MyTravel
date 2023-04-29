import React, { memo, useState, useRef, MutableRefObject } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native'

//Custom Imports
import color from '../../constants/color';
import SearchBar from '../../components/SearchBar';
import BackArrow from '../../assets/svgs/BackArrow';
import fontFamily from '../../constants/fontFamily';
import CalendarView from '../../components/CalendarView';
import { HomeScreenNavigationProp, ExploreJourneyRouteProp } from '../../navigation/types';

type Props = {
    route: ExploreJourneyRouteProp;
    navigation: HomeScreenNavigationProp;
}

const ExploreJourney = (props: Props) => {

    const [source, setSource] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [departureTime, setDepartureTime] = useState<string>("Departure");
    const [arrival, setArrival] = useState<string>("Arrival");

    const sourceRef = useRef() as MutableRefObject<TextInput>;
    const destinationRef = useRef() as MutableRefObject<TextInput>;

    const onBackPress = () => {
        props?.navigation && props.navigation.goBack()
    }
    const handleSourceChange = (value: string) => setSource(value);
    const onPressSourceRightIcon = () => {
        sourceRef.current.clear();
        setSource("");
    }
    const handleDestinationChange = (value: string) => setDestination(value);
    const onPressDestinationRightIcon = () => {
        destinationRef.current.clear();
        setDestination("");
    }

    const onSearch = () => {

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
                <Text style={styles.searchFlight}>{"Search flights"}</Text>
                <SearchBar
                    ref={sourceRef}
                    placeholder={"Select Destination City or Airport"}
                    query={source}
                    handleQueryChange={handleSourceChange}
                    shouldShowIcon={true}
                    clearSearch={true}
                    onPressRightIcon={onPressSourceRightIcon}
                    customStyles={styles.sourceInputStyle}
                />
                <SearchBar
                    ref={destinationRef}
                    placeholder={"Select Arrival City or Airport"}
                    query={destination}
                    handleQueryChange={handleDestinationChange}
                    shouldShowIcon={true}
                    clearSearch={true}
                    onPressRightIcon={onPressDestinationRightIcon}
                    customStyles={styles.destinationInputStyle}
                />
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
                <TouchableOpacity style = {styles.searchButton} onPress={onSearch}>
                    <Text style = {styles.searchText}>
                        {"Search Flight"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
    searchButton:{
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
    searchText:{
        color: color.white,
        fontFamily: fontFamily.bold,
        fontSize: 16,
    }
})