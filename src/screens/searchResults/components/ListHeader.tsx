import React, {memo} from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

//Custom Imports
import color from '../../../constants/color'
import fontFamily from '../../../constants/fontFamily'
import { searchResultsSelector } from '../../../selectors/travel.selector'

type Props = {}

const ListHeader = (props: Props) => {
    const searchResults = useSelector(searchResultsSelector);
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{`${searchResults.length} Flights found`}</Text>
            <TouchableOpacity style={styles.updateContainer}>
                <Image resizeMode={"contain"} style={styles.updateIcon} source={{ uri: "https://img.icons8.com/material-two-tone/24/000000/restart--v1.png" }} />
                <Text style={styles.updateTextStyle}>{"Update"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(ListHeader);

const styles = StyleSheet.create({
    sectionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    sectionTitle: {
        color: color.mediumBlack,
        fontFamily: fontFamily.bold,
        fontSize: 16,
    },
    updateContainer: {
        flexDirection: "row"
    },
    updateIcon: {
        width: 15,
        height: 15,
        tintColor: color.inActive,
    },
    updateTextStyle: {
        color: color.inActive,
        fontFamily: fontFamily.medium,
        fontSize: 14,
        marginStart: 6
    }
})